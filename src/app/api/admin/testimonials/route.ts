import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/admin-guard';
import { testimonialSchema } from '@/lib/validations';

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }
  const testimonials = await prisma.testimonial.findMany({ orderBy: { createdAt: 'desc' } });
  // Array direkt zurückgeben – passend zum Admin-Frontend.
  return NextResponse.json(testimonials);
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }
  const body = await request.json();
  const parsed = testimonialSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors[0]?.message }, { status: 400 });
  }
  const testimonial = await prisma.testimonial.create({
    data: {
      name: parsed.data.name,
      role: parsed.data.role || null,
      company: parsed.data.company || null,
      content: parsed.data.content,
      rating: parsed.data.rating,
      location: parsed.data.location || null,
      published: parsed.data.published ?? true,
    },
  });
  // Testimonial direkt zurückgeben – passend zum Admin-Frontend.
  return NextResponse.json(testimonial);
}

export async function PATCH(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }
  const { id, published } = await request.json();
  if (!id) return NextResponse.json({ error: 'ID fehlt.' }, { status: 400 });
  const testimonial = await prisma.testimonial.update({
    where: { id },
    data: { published: Boolean(published) },
  });
  return NextResponse.json({ ok: true, testimonial });
}

export async function DELETE(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }
  const url = new URL(request.url);
  let id = url.searchParams.get('id');
  if (!id) {
    try {
      const body = await request.json();
      id = body?.id ?? null;
    } catch {
      id = null;
    }
  }
  if (!id) return NextResponse.json({ error: 'ID fehlt.' }, { status: 400 });
  await prisma.testimonial.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
