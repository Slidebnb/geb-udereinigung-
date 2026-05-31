import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { isAdmin } from '@/lib/admin-guard';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file') as File | null;

  if (!file) {
    return NextResponse.json({ error: 'Keine Datei.' }, { status: 400 });
  }

  if (!file.type.startsWith('image/')) {
    return NextResponse.json({ error: 'Nur Bilddateien erlaubt (PNG, JPG, SVG).' }, { status: 400 });
  }

  if (file.size > 2 * 1024 * 1024) {
    return NextResponse.json({ error: 'Datei zu groß (max. 2 MB).' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const ext = file.name.split('.').pop() || 'png';
  const filename = `logo-${Date.now()}.${ext}`;
  const uploadsDir = join(process.cwd(), 'public', 'uploads');

  await mkdir(uploadsDir, { recursive: true });
  await writeFile(join(uploadsDir, filename), buffer);

  const url = `/uploads/${filename}`;

  // Persist logo_url in settings
  await prisma.setting.upsert({
    where: { key: 'logo_url' },
    update: { value: url },
    create: { key: 'logo_url', value: url },
  });

  revalidatePath('/', 'layout');

  return NextResponse.json({ url });
}
