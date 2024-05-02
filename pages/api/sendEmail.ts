import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import { EmailTemplate } from '../../components/email';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log('req', JSON.parse(req.body));
  const { data, error } = await resend.emails.send({
    from: 'Les miches <lesmichesamicha@gmail.com>',
    to: ['lesmichesamicha@gmail.com'],
    subject: `Commande du ${new Date()}`,
    react: EmailTemplate(JSON.parse(req.body)),
    text: 'coucou',
  });

  if (error) {
    return res.status(400).json(error);
  }

  res.status(200).json(data);
}
