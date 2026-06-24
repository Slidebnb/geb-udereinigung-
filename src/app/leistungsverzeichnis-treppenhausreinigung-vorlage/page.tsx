import type { Metadata } from 'next';
import DownloadLandingPage from '@/components/lead/DownloadLandingPage';
import { getDownloadLandingPage } from '@/lib/growth-content';
import { siteConfig } from '@/lib/site';

const page = getDownloadLandingPage('leistungsverzeichnis-treppenhausreinigung-vorlage')!;

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.description,
  alternates: { canonical: `${siteConfig.url}/${page.slug}` },
  openGraph: { title: page.metaTitle, description: page.description, url: `${siteConfig.url}/${page.slug}`, images: ['/opengraph-image'] },
  twitter: { card: 'summary_large_image', title: page.metaTitle, description: page.description, images: ['/opengraph-image'] },
};

export default function Page() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: page.faq.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) }) }} />
    <DownloadLandingPage page={page} />
  </>;
}
