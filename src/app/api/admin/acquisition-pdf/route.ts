import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createAcquisitionPdf } from '@/lib/acquisition-pdf';
import { isAdmin } from '@/lib/admin-guard';
import { serviceModuleMap } from '@/lib/document-generator/service-modules';
import { prisma } from '@/lib/prisma';
import { siteConfig } from '@/lib/site';

const requestSchema = z.object({
  title: z.string().trim().min(3).max(120),
  audience: z.string().trim().min(2).max(120),
  intro: z.string().trim().min(20).max(900),
  callToAction: z.string().trim().min(10).max(500),
  serviceKeys: z.array(z.string().trim()).min(1).max(15),
});

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  const parsed = requestSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: 'Bitte füllen Sie alle Angaben aus und wählen Sie mindestens eine Dienstleistung.' }, { status: 400 });
  const serviceKeys = [...new Set(parsed.data.serviceKeys)];
  if (serviceKeys.some(key => !serviceModuleMap.has(key))) return NextResponse.json({ error: 'Die Leistungsauswahl enthält einen unbekannten Eintrag.' }, { status: 400 });
  const settings = Object.fromEntries((await prisma.setting.findMany()).map(item => [item.key, item.value]));
  try {
    const bytes = await createAcquisitionPdf({ ...parsed.data, serviceKeys }, {
      name: settings.legal_company_name || siteConfig.name,
      street: settings.legal_street || siteConfig.address.street,
      zip: settings.legal_zip || siteConfig.address.zip,
      city: settings.legal_city || siteConfig.address.city,
      phone: settings.phone || siteConfig.phone,
      email: settings.contact_email || siteConfig.email,
      website: siteConfig.url.replace(/^https?:\/\//, ''),
    });
    return new NextResponse(Buffer.from(bytes), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="huwa-leistungsuebersicht.pdf"',
        'Cache-Control': 'no-store',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Die PDF konnte nicht erzeugt werden. Bitte prüfen Sie die eingegebenen Texte.' }, { status: 500 });
  }
}
