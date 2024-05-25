import { render } from '@react-email/render';
import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { EmailTemplate } from '../../components/email';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    secure: true,
    port: 465,
    auth: {
      user: 'lesmichesamicha@gmail.com',
      pass: process.env.GMAIL_API_PASS,
    },
  });

  const parsed = JSON.parse(req.body);
  const emailHtml = render(
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

  const info = await transporter.sendMail({
    from: 'Les Miches à Micha <lesmichesamicha@gmail.com>',
    to: ['lesmichesamicha@gmail.com'],
    // to: ['mehdi.fekih@gmail.com'],
    subject: `Commande du ${new Date().toLocaleTimeString([], {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })}`,
    html: emailHtml,
  });

  // if (error) {
  //   return res.status(400).json(error);
  // }
  console.log('Message sent: %s', info.messageId);

  res.status(200).json({ id: info.accepted });
}
