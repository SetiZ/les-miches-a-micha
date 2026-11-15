import { render } from '@react-email/render';
import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';
import { createElement } from 'react';
import {
  CustomerEmailTemplate,
  EmailTemplate,
} from '../../components/react/EmailTemplate';
import { SITE_URL } from '../../utils/site';
import carte from '../../data/carte.json';

const GMAIL_USER = process.env.GMAIL_USER || 'lesmichesamicha@gmail.com';
const GMAIL_PASS = process.env.GMAIL_API_PASS;
const BAKERY_EMAIL = process.env.BAKERY_EMAIL || 'lesmichesamicha@gmail.com';

export const POST: APIRoute = async ({ request }) => {
  if (!GMAIL_PASS) {
    console.error('GMAIL_API_PASS is not set');
    return new Response(
      JSON.stringify({ error: 'Email service misconfigured' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    secure: true,
    port: 465,
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_PASS,
    },
  });

  try {
    const parsed = await request.json();

    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Rebuild the cart from carte.json so names, prices and the total shown in
    // the emails can never be forged by the client.
    const rawCart: { id?: unknown; count?: unknown }[] =
      Array.isArray(parsed.cart) && parsed.cart.length <= 200
        ? parsed.cart
        : [];
    const trustedCart = rawCart.flatMap((item) => {
      const product = carte.products.find((p) => p.id === item.id);
      const count = typeof item.count === 'number' ? Math.floor(item.count) : 0;
      if (!product || count < 1) return [];
      return [
        {
          id: product.id,
          name: product.title,
          price: product.prix,
          // shortcut: count clamped to 99, raise if a real order ever needs more
          count: Math.min(count, 99),
        },
      ];
    });

    if (
      !parsed.name ||
      typeof parsed.name !== 'string' ||
      !parsed.date ||
      typeof parsed.email !== 'string' ||
      !EMAIL_RE.test(parsed.email) ||
      trustedCart.length === 0 ||
      (parsed.deliveryMode === 'delivery' && !parsed.address)
    ) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }
    const deliveryMode =
      parsed.deliveryMode === 'delivery' ? 'delivery' : 'pickup';

    const total = trustedCart.reduce(
      (sum, item) => sum + item.price * item.count,
      0,
    );

    const orderDate = new Date().toLocaleString('fr-FR', {
      timeZone: 'Europe/Paris',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const emailHtml = await render(
      createElement(EmailTemplate, {
        name: parsed.name,
        phoneNumber: parsed.phoneNumber,
        email: parsed.email,
        date: parsed.date,
        timeSlot: parsed.timeSlot,
        deliveryMode,
        address: parsed.address,
        comment: parsed.comment,
        total,
        cart: trustedCart,
      }),
    );

    const customerEmailHtml = await render(
      createElement(CustomerEmailTemplate, {
        name: parsed.name,
        date: parsed.date,
        timeSlot: parsed.timeSlot,
        deliveryMode,
        total,
        cart: trustedCart,
        siteUrl: SITE_URL,
      }),
    );

    await transporter.sendMail({
      from: `Les Miches à Micha <${GMAIL_USER}>`,
      to: [BAKERY_EMAIL],
      subject: `Commande du ${orderDate}`,
      html: emailHtml,
    });

    await transporter.sendMail({
      from: `Les Miches à Micha <${GMAIL_USER}>`,
      to: [parsed.email],
      subject: 'Confirmation de commande — Les Miches à Micha',
      html: customerEmailHtml,
    });

    console.log('Order emails sent successfully');
    return new Response(JSON.stringify({ id: 'sent' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Failed to send order email:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to send order email' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
};
