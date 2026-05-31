import { prisma } from '@/lib/prisma';
import Link from 'next/link';

async function getKunden() {
  const kunden = await prisma.user.findMany({
    where: { role: 'kunde' },
    orderBy: { createdAt: 'desc' },
    include: {
      _count: { select: { protocols: true } },
    },
  });
  return kunden;
}

export default async function KundenPage() {
  const kunden = await getKunden();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Kunden</h1>
        <Link
          href="/admin/kunden/neu"
          className="btn-primary text-sm px-4 py-2"
        >
          + Neuer Kunde
        </Link>
      </div>

      {kunden.length === 0 ? (
        <div className="bg-white rounded-xl p-8 text-center text-gray-500 shadow-sm">
          <div className="text-4xl mb-3">👥</div>
          <div className="font-medium mb-1">Noch keine Kunden angelegt</div>
          <p className="text-sm text-gray-400 mb-4">Legen Sie Ihr erstes Kundenkonto an, um Protokolle zu verwalten.</p>
          <Link href="/admin/kunden/neu" className="btn-primary text-sm px-4 py-2">
            Ersten Kunden anlegen
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="hidden md:grid grid-cols-[auto_1fr_1.5fr_0.8fr_1fr_1fr] gap-4 px-6 py-3 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wide">
            <div></div>
            <div>Name</div>
            <div>E-Mail</div>
            <div>Protokolle</div>
            <div>Erstellt</div>
            <div>Aktionen</div>
          </div>

          <div className="divide-y divide-gray-100">
            {kunden.map(k => (
              <div
                key={k.id}
                className="grid grid-cols-1 md:grid-cols-[auto_1fr_1.5fr_0.8fr_1fr_1fr] gap-2 md:gap-4 px-6 py-4 items-center"
              >
                <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold shrink-0">
                  {(k.name || k.email).charAt(0).toUpperCase()}
                </div>
                <div className="font-medium text-gray-800">{k.name || '–'}</div>
                <div className="text-sm text-gray-600 truncate">{k.email}</div>
                <div className="text-sm text-gray-700 font-medium">{k._count.protocols}</div>
                <div className="text-sm text-gray-500">
                  {new Date(k.createdAt).toLocaleDateString('de-DE')}
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/admin/kunden/${k.id}/protokoll`}
                    className="text-xs px-3 py-1.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
                  >
                    + Protokoll
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
