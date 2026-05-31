import type { Metadata } from 'next';
import ServicePage from '@/components/shared/ServicePage';
import { siteConfig } from '@/lib/site';
import { getServiceBySlug } from '@/lib/services';

const s = getServiceBySlug('baureinigung')!;

export const metadata: Metadata = {
  title: s.metaTitle,
  description: s.metaDescription,
  alternates: { canonical: `${siteConfig.url}/leistungen/baureinigung` },
};

export default function BaureinigungPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Baureinigung Neuwied',
    provider: { '@type': 'LocalBusiness', name: siteConfig.name, url: siteConfig.url },
    description: 'Professionelle Baureinigung nach Baumaßnahmen und Renovierungen in Neuwied.',
    areaServed: siteConfig.serviceAreas,
    serviceType: 'Baureinigung',
  };
  return (
    <ServicePage
      icon="🔨"
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
        { href: '/gebaudereinigung-neuwied', label: 'Gebäudereinigung Neuwied' },
        { href: '/gebaudereinigung-koblenz', label: 'Gebäudereinigung Koblenz' },
      ]}
    />
  );
}
