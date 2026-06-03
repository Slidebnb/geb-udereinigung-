import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import AdminShell from '@/components/admin/AdminShell';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any).role !== 'admin') {
    redirect('/admin/login');
  }

  return <AdminShell user={session.user as { name?: string | null; email?: string | null }}>{children}</AdminShell>;
}
