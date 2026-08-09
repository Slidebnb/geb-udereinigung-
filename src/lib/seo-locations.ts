export type SeoLocation = {
  name: string;
  slug: string;
  kind: 'city' | 'region';
  priority: 'primary' | 'extended';
};

export const seoLocations: SeoLocation[] = [
  { name: 'Neuwied', slug: 'neuwied', kind: 'city', priority: 'primary' },
  { name: 'Koblenz', slug: 'koblenz', kind: 'city', priority: 'primary' },
  { name: 'Bendorf', slug: 'bendorf', kind: 'city', priority: 'primary' },
  { name: 'Andernach', slug: 'andernach', kind: 'city', priority: 'extended' },
  { name: 'Mayen', slug: 'mayen', kind: 'city', priority: 'extended' },
  { name: 'Bad Neuenahr-Ahrweiler', slug: 'bad-neuenahr-ahrweiler', kind: 'city', priority: 'extended' },
  { name: 'Lahnstein', slug: 'lahnstein', kind: 'city', priority: 'extended' },
  { name: 'Boppard', slug: 'boppard', kind: 'city', priority: 'extended' },
  { name: 'Höhr-Grenzhausen', slug: 'hoehr-grenzhausen', kind: 'city', priority: 'extended' },
  { name: 'Haiger', slug: 'haiger', kind: 'city', priority: 'extended' },
  { name: 'Vallendar', slug: 'vallendar', kind: 'city', priority: 'extended' },
  { name: 'Nauort', slug: 'nauort', kind: 'city', priority: 'extended' },
  { name: 'Westerwald', slug: 'westerwald', kind: 'region', priority: 'extended' },
  { name: 'Puderbach', slug: 'puderbach', kind: 'city', priority: 'extended' },
  { name: 'Dierdorf', slug: 'dierdorf', kind: 'city', priority: 'extended' },
];

export const seoLocalServices = [
  { key: 'gebaudereinigung', label: 'Gebäudereinigung', offerValue: 'Gebäudereinigung' },
  { key: 'bueroeinigung', label: 'Büroreinigung', offerValue: 'Büroreinigung' },
  { key: 'treppenhausreinigung', label: 'Treppenhausreinigung', offerValue: 'Treppenhausreinigung' },
  { key: 'hausmeisterservice', label: 'Hausmeisterservice', offerValue: 'Hausmeisterdienste' },
  { key: 'winterdienst', label: 'Winterdienst', offerValue: 'Winterdienst' },
] as const;

export const primarySeoLocations = seoLocations.filter((location) => location.priority === 'primary');
