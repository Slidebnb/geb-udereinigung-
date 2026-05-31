import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import SessionProvider from '@/components/admin/SessionProvider';

export const metadata = {
  title: 'Admin | Huwa Gebäudereinigung',
  robots: { index: false, follow: false },
};

// Root-Layout für /admin: stellt nur den SessionProvider bereit.
// Die Authentifizierungsprüfung und das Dashboard-Layout (Sidebar/Header)
// erfolgen in der Route-Gruppe (dashboard), damit die Login-Seite ohne
// Layout und ohne Redirect-Schleife angezeigt werden kann.
export default async function AdminRootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
