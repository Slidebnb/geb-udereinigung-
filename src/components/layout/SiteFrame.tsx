'use client';

import { usePathname } from 'next/navigation';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import MobileActionBar from '@/components/shared/MobileActionBar';
import CookieBanner from '@/components/shared/CookieBanner';

export default function SiteFrame({ children, header, footer }: { children: React.ReactNode; header: React.ReactNode; footer: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return <main className="flex-1">{children}</main>;
  return <>
    {header}
    <main className="flex-1">{children}</main>
    {footer}
    <WhatsAppButton />
    <MobileActionBar />
    <CookieBanner />
  </>;
}
