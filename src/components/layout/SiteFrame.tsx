'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/layout/HeaderWrapper';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import MobileActionBar from '@/components/shared/MobileActionBar';
import CookieBanner from '@/components/shared/CookieBanner';

export default function SiteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return <main className="flex-1">{children}</main>;
  return <>
    <Header />
    <main className="flex-1">{children}</main>
    <Footer />
    <WhatsAppButton />
    <MobileActionBar />
    <CookieBanner />
  </>;
}
