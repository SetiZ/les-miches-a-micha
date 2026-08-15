export const SITE_URL =
  import.meta.env.SITE ||
  (import.meta.env.VERCEL_URL && `https://${import.meta.env.VERCEL_URL}`) ||
  'https://les-miches-a-micha.vercel.app';
