import { randomUUID } from 'node:crypto';
import { mkdir, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/admin-guard';
import { prisma } from '@/lib/prisma';
import { parseTrustedClients, trustedClientsSchema } from '@/lib/trusted-clients';

const SETTING_KEY = 'trusted_clients';
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');
const imageTypes = new Map([
  ['image/png', 'png'],
  ['image/jpeg', 'jpg'],
  ['image/webp', 'webp'],
]);

function hasValidSignature(buffer: Buffer, extension: string) {
  if (extension === 'png') return buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  if (extension === 'jpg') return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  if (extension === 'webp') return buffer.subarray(0, 4).toString('ascii') === 'RIFF' && buffer.subarray(8, 12).toString('ascii') === 'WEBP';
  return false;
}

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
  if (file.size < 16 || file.size > 2 * 1024 * 1024) return NextResponse.json({ error: 'Das Logo darf maximal 2 MB groß sein.' }, { status: 400 });

  const extension = imageTypes.get(file.type);
  const sourceExtension = file.name.split('.').pop()?.toLowerCase() === 'jpeg' ? 'jpg' : file.name.split('.').pop()?.toLowerCase();
  if (!extension || sourceExtension !== extension) return NextResponse.json({ error: 'Erlaubt sind PNG, JPG und WebP. SVG ist aus Sicherheitsgründen nicht erlaubt.' }, { status: 400 });
  const buffer = Buffer.from(await file.arrayBuffer());
  if (!hasValidSignature(buffer, extension)) return NextResponse.json({ error: 'Der tatsächliche Dateiinhalt entspricht keinem erlaubten Bildformat.' }, { status: 400 });

  const id = randomUUID();
  const filename = `client-logo-${id}.${extension}`;
  await mkdir(UPLOAD_DIR, { recursive: true });
  await writeFile(path.join(UPLOAD_DIR, filename), buffer, { flag: 'wx' });
  try {
    const clients = await readClients();
    const saved = await saveClients([...clients, { id, name, logoUrl: `/uploads/${filename}`, website, published: true }]);
    return NextResponse.json(saved, { status: 201 });
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
  if (filename.startsWith('client-logo-')) await unlink(path.join(UPLOAD_DIR, filename)).catch(() => undefined);
  return NextResponse.json(saved);
}
