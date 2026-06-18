import { getAllServiceSlugs } from '@/lib/services';

export type SeoRoute = {
  path: string;
  label: string;
  changeFrequency: 'weekly' | 'monthly' | 'yearly';
  priority: number;
};

export const cities = [
  { name: 'Neuwied', slug: 'neuwied' },
  { name: 'Koblenz', slug: 'koblenz' },
  { name: 'Bendorf', slug: 'bendorf' },
  { name: 'Andernach', slug: 'andernach' },
  { name: 'Bad Neuenahr-Ahrweiler', slug: 'bad-neuenahr-ahrweiler' },
  { name: 'Boppard', slug: 'boppard' },
  { name: 'Lahnstein', slug: 'lahnstein' },
  { name: 'Mayen', slug: 'mayen' },
] as const;

export const localServices = [
  { key: 'gebaudereinigung', label: 'Gebäudereinigung', offerValue: 'Gebäudereinigung' },
  { key: 'bueroeinigung', label: 'Büroreinigung', offerValue: 'Büroreinigung' },
  { key: 'treppenhausreinigung', label: 'Treppenhausreinigung', offerValue: 'Treppenhausreinigung' },
  { key: 'hausmeisterservice', label: 'Hausmeisterservice', offerValue: 'Hausmeisterdienste' },
  { key: 'winterdienst', label: 'Winterdienst', offerValue: 'Winterdienst' },
] as const;

export const coreSeoRoutes: SeoRoute[] = [
  { path: '/', label: 'Startseite', changeFrequency: 'weekly', priority: 1 },
  { path: '/leistungen', label: 'Leistungen', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/ueber-uns', label: 'Über uns', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/angebot', label: 'Angebot anfragen', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/kontakt', label: 'Kontakt', changeFrequency: 'monthly', priority: 0.75 },
  { path: '/preisrechner', label: 'Preisrechner', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/gartenpflege', label: 'Gartenpflege', changeFrequency: 'monthly', priority: 0.75 },
  { path: '/winterdienst-anmeldung-2026', label: 'Winterdienst 2026/2027', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/gartenpflege-anmeldung-2026', label: 'Gartenpflege 2026/2027', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/checkliste', label: 'Haustechnik-Checkliste', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/blog', label: 'Ratgeber', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/faq', label: 'Häufige Fragen', changeFrequency: 'monthly', priority: 0.65 },
  { path: '/sitemap', label: 'Seitenübersicht', changeFrequency: 'monthly', priority: 0.3 },
  { path: '/impressum', label: 'Impressum', changeFrequency: 'yearly', priority: 0.2 },
  { path: '/datenschutz', label: 'Datenschutz', changeFrequency: 'yearly', priority: 0.2 },
  { path: '/agb', label: 'AGB', changeFrequency: 'yearly', priority: 0.2 },
];

export const serviceSeoRoutes: SeoRoute[] = getAllServiceSlugs().map((slug) => ({
  path: `/leistungen/${slug}`,
  label: slug.replaceAll('-', ' '),
  changeFrequency: 'monthly',
  priority: 0.8,
}));

export const citySeoRoutes: SeoRoute[] = localServices.flatMap((service) =>
  cities.map((city) => ({
    path: `/${service.key}-${city.slug}`,
    label: `${service.label} ${city.name}`,
    changeFrequency: 'monthly' as const,
    priority: 0.82,
  })),
);

export const publicSeoRoutes = [...coreSeoRoutes, ...serviceSeoRoutes, ...citySeoRoutes];

const existingCityRoutes = new Set(
  localServices.flatMap((service) =>
    cities.slice(0, 3).map((city) => `${service.key}-${city.slug}`),
  ),
);

export const generatedCityRoutes = citySeoRoutes.filter(
  (route) => !existingCityRoutes.has(route.path.slice(1)),
);

export function getCityServiceRoute(slug: string) {
  const service = localServices.find((item) => slug.startsWith(`${item.key}-`));
  if (!service) return null;
  const citySlug = slug.slice(service.key.length + 1);
  const city = cities.find((item) => item.slug === citySlug);
  return city ? { service, city, slug } : null;
}
