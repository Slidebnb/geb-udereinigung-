import { siteConfig } from '@/lib/site';

export default function Head() {
  const title = 'Winterdienst 2026/2027 anmelden | Neuwied, Koblenz, Westerwald';
  const description = 'Winterdienst 2026/2027 frühzeitig sichern: Räumdienst und Streudienst für Hausverwaltungen, Gewerbe, Parkplätze und Gehwege in Neuwied, Koblenz, Westerwald und Haiger.';
  const url = `${siteConfig.url}/winterdienst-anmeldung-2026`;
  const faq = [
    {
      '@type': 'Question',
      name: 'Wann sollte ich Winterdienst 2026/2027 anmelden?',
      acceptedAnswer: { '@type': 'Answer', text: 'Für die Saison 2026/2027 empfiehlt sich eine frühe Anmeldung, damit Route und Kapazität rechtzeitig geplant werden können.' },
    },
    {
      '@type': 'Question',
      name: 'Welche Flächen übernimmt Huwa im Winterdienst?',
      acceptedAnswer: { '@type': 'Answer', text: 'Typische Flächen sind Gehwege, Einfahrten, Parkplätze, Eingangsbereiche, Treppen und Rampen.' },
    },
  ];
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Winterdienst 2026/2027',
      serviceType: 'Räumdienst und Streudienst',
      provider: { '@type': 'LocalBusiness', name: siteConfig.name, telephone: siteConfig.phone },
      areaServed: siteConfig.serviceAreas,
      url,
    },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq },
  ];

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
