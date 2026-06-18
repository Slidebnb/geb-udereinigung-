import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kundenportal Login | Huwa Gebäudedienste',
  robots: { index: false, follow: false },
};

export default function PortalAuthLayout({ children }: { children: React.ReactNode }) {
  return children;
}
