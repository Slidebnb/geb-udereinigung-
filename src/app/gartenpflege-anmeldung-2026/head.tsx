import { siteConfig } from '@/lib/site';

export default function Head() {
  const title = 'Gartenpflege 2026/2027 anmelden | Heckenschneiden & Grünpflege';
  const description = 'Gartenpflege 2026/2027 frühzeitig anmelden: Heckenschneiden, Rasenmähen, Laubentfernung, Beetpflege und Grünpflege für Neuwied, Koblenz und Bendorf.';
  const url = `${siteConfig.url}/gartenpflege-anmeldung-2026`;
  const faq = [
    {
      '@type': 'Question',
      name: 'Welche Gartenarbeiten kann ich für 2026 anmelden?',
      acceptedAnswer: { '@type': 'Answer', text: 'Sie können unter anderem Rasenmähen, Heckenschneiden, Unkrautentfernung, Laubentfernung, Beetpflege, Wegereinigung und Grünschnitt-Entsorgung anfragen.' },
    },
    {
      '@type': 'Question',
      name: 'Für wen eignet sich ein Gartenpflege-Saisonvertrag?',
      acceptedAnswer: { '@type': 'Answer', text: 'Ein Saisonvertrag eignet sich für Wohnanlagen, Hausverwaltungen, Gewerbeobjekte und private Gärten mit regelmäßigem Pflegebedarf.' },
    },
  ];
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Gartenpflege 2026/2027',
      serviceType: 'Gartenpflege, Heckenschneiden, Rasenmähen und Grünpflege',
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
