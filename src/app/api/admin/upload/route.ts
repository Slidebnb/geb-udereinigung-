import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { isAdmin } from '@/lib/admin-guard';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

const ALLOWED_IMAGE_TYPES = new Map([
  ['image/png', 'png'],
  ['image/jpeg', 'jpg'],
  ['image/webp', 'webp'],
  ['image/avif', 'avif'],
  ['image/gif', 'gif'],
]);

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file') as File | null;

  if (!file) {
    return NextResponse.json({ error: 'Keine Datei.' }, { status: 400 });
  }

  const originalExt = file.name.split('.').pop()?.toLowerCase() || '';
  const normalizedExt = originalExt === 'jpeg' ? 'jpg' : originalExt;
  const expectedExt = ALLOWED_IMAGE_TYPES.get(file.type);

  if (!expectedExt || normalizedExt !== expectedExt) {
    return NextResponse.json(
      { error: 'Nur PNG, JPG, WebP, AVIF oder GIF sind erlaubt. SVG ist aus Sicherheitsgründen deaktiviert.' },
      { status: 400 }
    );
  }

  if (file.size > 2 * 1024 * 1024) {
    return NextResponse.json({ error: 'Datei zu groß (max. 2 MB).' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const ext = expectedExt;
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
