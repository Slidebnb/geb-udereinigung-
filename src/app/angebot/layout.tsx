import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Kostenloses Angebot anfragen | Huwa Gebäudedienste',
  description: 'Fordern Sie ein kostenloses, unverbindliches Angebot für Reinigung, Hausmeisterservice, Gartenpflege oder Winterdienst in der Region an.',
  alternates: { canonical: `${siteConfig.url}/angebot` },
  openGraph: { url: `${siteConfig.url}/angebot`, images: ['/opengraph-image'] },
};

export default function AngebotLayout({ children }: { children: React.ReactNode }) {
  return children;
}
