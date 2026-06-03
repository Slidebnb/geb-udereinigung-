import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/lib/site';
import Header from '@/components/layout/HeaderWrapper';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import CookieBanner from '@/components/shared/CookieBanner';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.name} | Professionelle Reinigung`, template: `%s | ${siteConfig.shortName}` },
  description: siteConfig.description,
  keywords: ['Gebäudereinigung', 'Hausmeisterdienste', 'Büroreinigung', 'Winterdienst', 'Neuwied', 'Koblenz', 'Bendorf', 'Reinigungsunternehmen'],
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
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${siteConfig.url}/#organization`,
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.png`,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.address.street,
    postalCode: siteConfig.address.zip,
    addressLocality: siteConfig.address.city,
    addressCountry: siteConfig.address.country,
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteConfig.url}/#website`,
  url: siteConfig.url,
  name: siteConfig.name,
  inLanguage: 'de-DE',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="flex flex-col min-h-screen">
        <Header />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <CookieBanner />
      </body>
    </html>
  );
}
