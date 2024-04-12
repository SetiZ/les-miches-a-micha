// import type { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse,
// ) {
//   const RESEND_API_KEY = "re_7N3dCEat_2bRyYaR8dBWtUPr7AnKV6zWf";
//   // if (req.method === "POST") {
//   const result = await fetch("https://api.resend.com/emails", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${RESEND_API_KEY}`,
//     },
//     body: JSON.stringify({
//       from: "Acme <onboarding@resend.dev>",
//       to: ["mehdi.fekih@gmail.com"],
//       subject: "hello world",
//       html: "<strong>it works!</strong>",
//     }),
//   });
//   console.log(result);

//   if (result.ok) {
//     // const data = await result.json();
//     // return NextResponse.json(data);
//     res.status(200).send({ status: "OK" });
//   }
//   // }
// }

import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import { EmailTemplate } from '../../components/email';

const resend = new Resend(
  're_M4paq6GE_3A6V3ufz3R62p46XAyuNUSpc' /*process.env.RESEND_API_KEY */,
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log('req', req.body);
  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: ['funkysetiz@gmail.com'],
    subject: 'Hello world',
    react: EmailTemplate({ firstName: 'John' }),
    text: 'coucou',
  });

  if (error) {
    return res.status(400).json(error);
  }

  res.status(200).json(data);
}
