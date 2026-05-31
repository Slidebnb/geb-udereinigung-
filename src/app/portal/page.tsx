import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

async function getPortalData(userId: string) {
  const protocols = await prisma.cleaningProtocol.findMany({
    where: { customerId: userId },
    orderBy: { date: 'desc' },
    take: 5,
  });
  return { protocols };
}

export default async function PortalDashboardPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id as string;
  const { protocols } = await getPortalData(userId);

  const latestProtocol = protocols[0];
  const nextAppointment = latestProtocol?.notes?.includes('Nächster Termin:')
    ? latestProtocol.notes.split('Nächster Termin:')[1]?.trim()
    : null;

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#0C2340] mb-1">
        Willkommen, {session?.user?.name || 'Kunde'}!
      </h1>
      <p className="text-gray-500 text-sm mb-8">Ihr persönliches Kunden-Portal</p>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="text-3xl font-bold text-[#0C2340]">{protocols.length}</div>
          <div className="text-sm text-gray-500 mt-1">Protokolle (letzte 5)</div>
          <Link href="/portal/protokolle" className="text-[#4BB8F5] text-xs mt-2 inline-block hover:underline">
            Alle anzeigen →
          </Link>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="text-sm font-medium text-gray-700 mb-1">Letzter Einsatz</div>
          {latestProtocol ? (
            <>
              <div className="font-semibold text-[#0C2340]">{latestProtocol.type}</div>
              <div className="text-xs text-gray-500 mt-0.5">
                {new Date(latestProtocol.date).toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })}
              </div>
            </>
          ) : (
            <div className="text-sm text-gray-400">Noch kein Protokoll vorhanden</div>
          )}
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="text-sm font-medium text-gray-700 mb-1">Nächster Termin</div>
          {nextAppointment ? (
            <div className="font-semibold text-[#2DC94E]">{nextAppointment}</div>
          ) : (
            <div className="text-sm text-gray-400">Kein Termin eingetragen</div>
          )}
        </div>
      </div>

      {/* Recent protocols */}
      <div className="bg-white rounded-xl shadow-sm mb-6">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-[#0C2340]">Letzte Reinigungsprotokolle</h2>
          <Link href="/portal/protokolle" className="text-[#4BB8F5] text-sm hover:underline">
            Alle anzeigen
          </Link>
        </div>
        {protocols.length === 0 ? (
          <div className="px-6 py-8 text-center text-gray-400 text-sm">
            Noch keine Protokolle vorhanden.
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {protocols.map(p => (
              <div key={p.id} className="px-6 py-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#4BB8F5]/10 flex items-center justify-center shrink-0">
                  <span className="text-lg">🧹</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-800 text-sm">{p.type}</div>
                  <div className="text-xs text-gray-500 truncate">{p.location}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs text-gray-500">
                    {new Date(p.date).toLocaleDateString('de-DE')}
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">
                    {p.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Contact info */}
      <div className="bg-[#0C2340] rounded-xl p-6 text-white">
        <h2 className="font-bold text-lg mb-4">Kontakt &amp; Ansprechpartner</h2>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-blue-300 text-xs mb-1">Firma</div>
            <div className="font-medium">Huwa Gebäudereinigung &amp; Hausmeisterdienste</div>
          </div>
          <div>
            <div className="text-blue-300 text-xs mb-1">Standort</div>
            <div className="font-medium">Neuwied (Rheinland-Pfalz)</div>
          </div>
          <div>
            <div className="text-blue-300 text-xs mb-1">Telefon</div>
            <a href="tel:+4902631123456" className="font-medium text-[#4BB8F5] hover:underline">
              02631 / 123 456
            </a>
          </div>
          <div>
            <div className="text-blue-300 text-xs mb-1">E-Mail</div>
            <a href="mailto:info@huwa-reinigung.de" className="font-medium text-[#4BB8F5] hover:underline">
              info@huwa-reinigung.de
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
