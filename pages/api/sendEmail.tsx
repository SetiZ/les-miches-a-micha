import { render } from '@react-email/render';
import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { EmailTemplate, CustomerEmailTemplate } from '../../components/email';

const GMAIL_USER = process.env.GMAIL_USER || 'lesmichesamicha@gmail.com';
const GMAIL_PASS = process.env.GMAIL_API_PASS;
const BAKERY_EMAIL = process.env.BAKERY_EMAIL || 'lesmichesamicha@gmail.com';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://les-miches-a-micha.vercel.app';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!GMAIL_PASS) {
    console.error('GMAIL_API_PASS is not set');
    return res.status(500).json({ error: 'Email service misconfigured' });
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
    const parsed = JSON.parse(req.body);

    if (!parsed.name || !parsed.email || !parsed.date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const orderDate = new Date().toLocaleTimeString('fr-FR', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const emailHtml = await render(
      <EmailTemplate
        name={parsed.name}
        phoneNumber={parsed.phoneNumber}
        email={parsed.email}
        date={parsed.date}
        comment={parsed.comment}
        total={parsed.total}
        cart={parsed.cart}
      />,
    );

    const customerEmailHtml = await render(
      <CustomerEmailTemplate
        name={parsed.name}
        date={parsed.date}
        total={parsed.total}
        cart={parsed.cart}
        siteUrl={SITE_URL}
      />,
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
    res.status(200).json({ id: 'sent' });
  } catch (error) {
    console.error('Failed to send order email:', error);
    res.status(500).json({ error: 'Failed to send order email' });
  }
}
