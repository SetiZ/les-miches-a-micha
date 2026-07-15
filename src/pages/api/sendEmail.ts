import type { APIRoute } from 'astro';
import { render } from '@react-email/render';
import nodemailer from 'nodemailer';
import { EmailTemplate, CustomerEmailTemplate } from '../../components/react/EmailTemplate';
import { createElement } from 'react';

const GMAIL_USER = process.env.GMAIL_USER || 'lesmichesamicha@gmail.com';
const GMAIL_PASS = process.env.GMAIL_API_PASS;
const BAKERY_EMAIL = process.env.BAKERY_EMAIL || 'lesmichesamicha@gmail.com';
const SITE_URL =
  import.meta.env.SITE ||
  (import.meta.env.VERCEL_URL && `https://${import.meta.env.VERCEL_URL}`) ||
  'https://les-miches-a-micha.vercel.app';

export const POST: APIRoute = async ({ request }) => {
  if (!GMAIL_PASS) {
    console.error('GMAIL_API_PASS is not set');
    return new Response(JSON.stringify({ error: 'Email service misconfigured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
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

    if (!parsed.name || !parsed.email || !parsed.date) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const orderDate = new Date().toLocaleTimeString('fr-FR', {
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
        comment: parsed.comment,
        total: parsed.total,
        cart: parsed.cart,
      }),
    );

    const customerEmailHtml = await render(
      createElement(CustomerEmailTemplate, {
        name: parsed.name,
        date: parsed.date,
        total: parsed.total,
        cart: parsed.cart,
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
    return new Response(JSON.stringify({ error: 'Failed to send order email' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
