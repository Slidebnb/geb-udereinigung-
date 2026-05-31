export const siteConfig = {
  name: 'Huwa Gebäudereinigung & Hausmeisterdienste',
  shortName: 'Huwa Reinigung',
  legalName: 'Huwa Gebäudereinigung & Hausmeisterdienste GmbH',
  description:
    'Huwa Gebäudereinigung & Hausmeisterdienste – Ihr zuverlässiger Partner für professionelle Gebäudereinigung, Büroreinigung, Glasreinigung, Hausmeisterdienste und Winterdienst. Kostenloses Angebot anfordern!',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.huwa-reinigung.de',
  locale: 'de_DE',
  phone: process.env.NEXT_PUBLIC_PHONE || '+49 170 1234567',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '491701234567',
  email: 'info@huwa-reinigung.de',
  address: {
    street: 'Musterstraße 12',
    zip: '40210',
    city: 'Düsseldorf',
    region: 'Nordrhein-Westfalen',
    country: 'DE',
  },
  geo: {
    latitude: 51.2277,
    longitude: 6.7735,
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
    'Düsseldorf',
    'Köln',
    'Neuss',
    'Duisburg',
    'Essen',
    'Wuppertal',
    'Krefeld',
    'Mönchengladbach',
  ],
  foundingYear: 2009,
};

export type SiteConfig = typeof siteConfig;
