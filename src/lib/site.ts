import { WHATSAPP_NUMBER } from '@/lib/whatsapp';

export const siteConfig = {
  name: 'Huwa Gebäudereinigung & Hausmeisterdienste',
  shortName: 'Huwa Reinigung',
  legalName: 'Huwa Gebäudereinigung & Hausmeisterdienste',
  description:
    'Huwa Gebäudereinigung & Hausmeisterdienste – Ihr zuverlässiger Partner für professionelle Gebäudereinigung, Büroreinigung, Glasreinigung, Hausmeisterdienste und Winterdienst in Neuwied, Koblenz und Bendorf. Kostenloses Angebot anfordern!',
  url: 'https://huwa-gebaeudedienste.de',
  logoPath: '/brand/huwa-logo.png',
  logoUrl: 'https://huwa-gebaeudedienste.de/brand/huwa-logo.png',
  locale: 'de_DE',
  phone: process.env.NEXT_PUBLIC_PHONE || '02601 9131820',
  whatsapp: WHATSAPP_NUMBER,
  email: 'info@huwa-gebaeudedienste.de',
  address: {
    street: 'Mittelweg 24',
    zip: '56566',
    city: 'Neuwied',
    region: 'Rheinland-Pfalz',
    country: 'DE',
  },
  geo: {
    latitude: 50.4285,
    longitude: 7.4593,
  },
  openingHours: [
    { days: 'Mo–Fr', hours: '07:00 – 18:00 Uhr' },
    { days: 'Sa', hours: '08:00 – 14:00 Uhr' },
    { days: 'So', hours: 'Nach Vereinbarung' },
  ],
  social: {
    facebook: 'https://facebook.com/huwareinigung',
    instagram: 'https://instagram.com/huwareinigung',
  },
  serviceAreas: [
    'Neuwied',
    'Koblenz',
    'Bendorf',
    'Andernach',
    'Mayen',
    'Bad Neuenahr-Ahrweiler',
    'Lahnstein',
    'Boppard',
  ],
  foundingYear: 2020,
};

export type SiteConfig = typeof siteConfig;
