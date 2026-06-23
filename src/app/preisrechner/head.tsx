import { siteConfig } from '@/lib/site';

export default function Head() {
  const title = 'Preisrechner Gebäudereinigung Neuwied | Reinigungskosten schätzen';
  const description = 'Kosten für Gebäudereinigung, Büroreinigung, Treppenhausreinigung, Glasreinigung und Gartenpflege online schätzen. Für Neuwied, Koblenz, Westerwald und Haiger.';
  const url = `${siteConfig.url}/preisrechner`;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Reinigung Preisrechner',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url,
    provider: {
      '@type': 'LocalBusiness',
      name: siteConfig.name,
      telephone: siteConfig.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: siteConfig.address.street,
        postalCode: siteConfig.address.zip,
        addressLocality: siteConfig.address.city,
        addressCountry: siteConfig.address.country,
      },
    },
  };

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
