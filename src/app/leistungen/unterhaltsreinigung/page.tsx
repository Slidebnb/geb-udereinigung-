import type { Metadata } from 'next';
import ServicePage from '@/components/shared/ServicePage';
import { siteConfig } from '@/lib/site';
import { getServiceBySlug } from '@/lib/services';

const s = getServiceBySlug('unterhaltsreinigung')!;

export const metadata: Metadata = {
  title: s.metaTitle,
  description: s.metaDescription,
  alternates: { canonical: `${siteConfig.url}/leistungen/unterhaltsreinigung` },
};

export default function UnterhaltsreinigungPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Unterhaltsreinigung Neuwied',
    provider: { '@type': 'LocalBusiness', name: siteConfig.name, url: siteConfig.url },
    description: 'Regelmäßige Unterhaltsreinigung für Büros, Praxen und Gewerberäume in Neuwied.',
    areaServed: siteConfig.serviceAreas,
    serviceType: 'Unterhaltsreinigung',
  };
  return (
    <ServicePage
      icon="🔄"
      title={s.title}
      subtitle={s.heroDescription}
      description={s.intro}
      benefits={s.benefits}
      features={s.features.map(f => ({ title: f.title, desc: f.description }))}
      faq={s.faqs.map(f => ({ q: f.question, a: f.answer }))}
      breadcrumb={s.shortTitle}
      schema={schema}
      cityLinks={[
        { href: '/angebot', label: 'Kostenloses Angebot anfragen' },
        { href: '/bueroreinigung-neuwied', label: 'Büroreinigung Neuwied' },
        { href: '/treppenhausreinigung-neuwied', label: 'Treppenhausreinigung Neuwied' },
      ]}
    />
  );
}
