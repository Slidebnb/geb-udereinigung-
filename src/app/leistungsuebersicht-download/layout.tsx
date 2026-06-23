import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Leistungsübersicht Gebäudereinigung, Hausmeisterservice & Winterdienst als PDF',
  description:
    'Kostenlose Huwa Leistungsübersicht als PDF herunterladen: Gebäudereinigung, Hausmeisterservice, Gartenpflege, Winterdienst, Treppenhausreinigung und mehr für Hausverwaltungen, Gewerbe und Eigentümer.',
  alternates: { canonical: `${siteConfig.url}/leistungsuebersicht-download` },
  openGraph: {
    title: 'Huwa Leistungsübersicht als PDF herunterladen',
    description: 'Alle wichtigen Gebäudedienste und Leistungsbereiche für Hausverwaltungen, Gewerbe und Eigentümer in einer übersichtlichen PDF.',
    url: `${siteConfig.url}/leistungsuebersicht-download`,
    type: 'website',
    images: ['/opengraph-image'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Huwa Leistungsübersicht als PDF herunterladen',
    description: 'Gebäudereinigung, Hausmeisterservice, Winterdienst und Gartenpflege als kompakte Leistungsübersicht.',
  },
};

export default function LeistungsuebersichtDownloadLayout({ children }: { children: React.ReactNode }) {
  return children;
}
