import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import PortalSidebar from '@/components/portal/PortalSidebar';

export const metadata = {
  title: 'Kunden-Portal – Huwa Gebäudereinigung',
};

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any).role !== 'kunde') {
    redirect('/portal/login');
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <PortalSidebar user={session.user} />
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
}
