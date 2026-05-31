import type { Metadata } from 'next';
import ServicePage from '@/components/shared/ServicePage';
import { siteConfig } from '@/lib/site';
import { getServiceBySlug } from '@/lib/services';

const s = getServiceBySlug('grundreinigung')!;

export const metadata: Metadata = {
  title: s.metaTitle,
  description: s.metaDescription,
  alternates: { canonical: `${siteConfig.url}/leistungen/grundreinigung` },
};

export default function GrundreinigungPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Grundreinigung Neuwied',
    provider: { '@type': 'LocalBusiness', name: siteConfig.name, url: siteConfig.url },
    description: 'Professionelle Grundreinigung und Tiefenreinigung in Neuwied für Wohnungen, Büros und Gewerberäume.',
    areaServed: siteConfig.serviceAreas,
    serviceType: 'Grundreinigung',
  };
  return (
    <ServicePage
      icon="✨"
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
        { href: '/bueroeinigung-neuwied', label: 'Büroreinigung Neuwied' },
        { href: '/bueroeinigung-koblenz', label: 'Büroreinigung Koblenz' },
      ]}
    />
  );
}
