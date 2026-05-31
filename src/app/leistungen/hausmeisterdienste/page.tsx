import type { Metadata } from 'next';
import ServicePage from '@/components/shared/ServicePage';
import { siteConfig } from '@/lib/site';
import { getServiceBySlug } from '@/lib/services';

const s = getServiceBySlug('hausmeisterdienste')!;

export const metadata: Metadata = {
  title: s.metaTitle,
  description: s.metaDescription,
  alternates: { canonical: `${siteConfig.url}/leistungen/hausmeisterdienste` },
};

export default function HausmeisterdiensteePage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Hausmeisterdienste Neuwied',
    provider: { '@type': 'LocalBusiness', name: siteConfig.name, url: siteConfig.url },
    description: 'Professionelle Hausmeisterdienste und Objektbetreuung in Neuwied.',
    areaServed: siteConfig.serviceAreas,
    serviceType: 'Hausmeisterdienste',
  };
  return (
    <ServicePage
      icon="🔧"
      title={s.title}
      subtitle={s.heroDescription}
      description={s.intro}
      benefits={s.benefits}
      features={s.features.map(f => ({ title: f.title, desc: f.description }))}
      faq={s.faqs.map(f => ({ q: f.question, a: f.answer }))}
      breadcrumb={s.shortTitle}
      schema={schema}
    />
  );
}
