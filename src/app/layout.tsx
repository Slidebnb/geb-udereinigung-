import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/lib/site';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import CookieBanner from '@/components/shared/CookieBanner';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.name} | Professionelle Reinigung`, template: `%s | ${siteConfig.shortName}` },
  description: siteConfig.description,
  keywords: ['Gebäudereinigung', 'Hausmeisterdienste', 'Büroreinigung', 'Winterdienst', 'Düsseldorf', 'Reinigungsunternehmen'],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: { card: 'summary_large_image', title: siteConfig.name, description: siteConfig.description },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: { canonical: siteConfig.url },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={inter.variable}>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <CookieBanner />
      </body>
    </html>
  );
}
