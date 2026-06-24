import type { Metadata } from 'next';
import CostPage from '@/components/seo/CostPage';
import { getCostPage } from '@/lib/growth-content';
import { siteConfig } from '@/lib/site';

const page = getCostPage('bueroeinigung-kosten')!;

export const revalidate = 60;

export const metadata: Metadata = {
  title: `${page.title} | Huwa Gebaeudedienste`,
  description: page.description,
  alternates: { canonical: `${siteConfig.url}/${page.slug}` },
  openGraph: { title: page.title, description: page.description, url: `${siteConfig.url}/${page.slug}`, images: ['/opengraph-image'] },
  twitter: { card: 'summary_large_image', title: page.title, description: page.description, images: ['/opengraph-image'] },
};

export default function Page() { return <CostPage page={page} />; }
