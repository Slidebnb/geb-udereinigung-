import { randomUUID } from 'node:crypto';
import { mkdir, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/admin-guard';
import { prisma } from '@/lib/prisma';
import { parseTrustedClients, trustedClientsSchema } from '@/lib/trusted-clients';
import { processClientLogo } from '@/lib/client-logo-image';

const SETTING_KEY = 'trusted_clients';
const UPLOAD_DIR = path.join(process.cwd(), 'storage', 'client-logos');
const LEGACY_UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');
const MAX_UPLOAD_SIZE = 20 * 1024 * 1024;

async function readClients() {
  const setting = await prisma.setting.findUnique({ where: { key: SETTING_KEY } });
  return parseTrustedClients(setting?.value);
}

async function saveClients(clients: unknown) {
  const parsed = trustedClientsSchema.parse(clients);
  await prisma.setting.upsert({
    where: { key: SETTING_KEY },
    update: { value: JSON.stringify(parsed) },
    create: { key: SETTING_KEY, value: JSON.stringify(parsed) },
  });
  revalidatePath('/');
  return parsed;
}

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  return NextResponse.json(await readClients());
}

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  const formData = await request.formData();
  const file = formData.get('file');
  const name = String(formData.get('name') || '').trim();
  const website = String(formData.get('website') || '').trim();
  if (!(file instanceof File) || !name) return NextResponse.json({ error: 'Unternehmensname und Logo sind erforderlich.' }, { status: 400 });
  if (file.size < 1 || file.size > MAX_UPLOAD_SIZE) return NextResponse.json({ error: 'Das Bild darf maximal 20 MB groß sein.' }, { status: 400 });

  let optimized: Awaited<ReturnType<typeof processClientLogo>>;
  try {
    optimized = await processClientLogo(Buffer.from(await file.arrayBuffer()));
  } catch {
    return NextResponse.json({ error: 'Das Bild konnte nicht gelesen werden. Bitte verwenden Sie eine gültige Bilddatei bis 20 MB.' }, { status: 400 });
  }

  const id = randomUUID();
  const filename = `client-logo-${id}.webp`;
  await mkdir(UPLOAD_DIR, { recursive: true });
  await writeFile(path.join(UPLOAD_DIR, filename), optimized.buffer, { flag: 'wx' });
  try {
    const clients = await readClients();
    const saved = await saveClients([...clients, { id, name, logoUrl: `/uploads/${filename}`, website, published: true, backdrop: optimized.backdrop }]);
    return NextResponse.json(saved, {
      status: 201,
      headers: {
        'X-Image-Source-Format': optimized.sourceFormat,
        'X-Image-Original-Bytes': String(optimized.sourceSize),
        'X-Image-Optimized-Bytes': String(optimized.outputSize),
      },
    });
  } catch (error) {
    await unlink(path.join(UPLOAD_DIR, filename)).catch(() => undefined);
    const message = error instanceof Error ? error.message : 'Kundenlogo konnte nicht gespeichert werden.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  try {
    return NextResponse.json(await saveClients(await request.json()));
  } catch {
    return NextResponse.json({ error: 'Die Kundenlogo-Daten sind ungültig.' }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  const id = new URL(request.url).searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID fehlt.' }, { status: 400 });
  const clients = await readClients();
  const removed = clients.find(client => client.id === id);
  if (!removed) return NextResponse.json({ error: 'Kundenlogo nicht gefunden.' }, { status: 404 });
  const saved = await saveClients(clients.filter(client => client.id !== id));
  const filename = path.basename(removed.logoUrl);
  if (filename.startsWith('client-logo-')) {
    await Promise.all([
      unlink(path.join(UPLOAD_DIR, filename)).catch(() => undefined),
      unlink(path.join(LEGACY_UPLOAD_DIR, filename)).catch(() => undefined),
    ]);
  }
  return NextResponse.json(saved);
}
