import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { blogPostId } = await req.json();
  if (!blogPostId) {
    return NextResponse.json({ error: 'blogPostId fehlt.' }, { status: 400 });
  }

  const post = await prisma.blogPost.findUnique({ where: { id: blogPostId } });
  if (!post) {
    return NextResponse.json({ error: 'Artikel nicht gefunden.' }, { status: 404 });
  }

  // Truncate content to avoid token overflows
  const contentPreview = post.content.slice(0, 3000);

  const prompt = `Erstelle aus diesem Blogartikel Instagram-Content für eine Gebäudereinigungsfirma.

Artikel-Titel: ${post.title}
Artikel-Inhalt: ${contentPreview}

Regeln:
- Lokal ausgerichtet (Neuwied, Koblenz, Bendorf)
- Professionell, keine Fake-Versprechen
- Caption max 300 Zeichen + Hashtags
- CTA: "Kostenloses Angebot anfordern"

Antworte NUR mit validem JSON:
{
  "feedCaption": "Caption-Text ohne Hashtags, max 300 Zeichen",
  "carouselSlides": [{"headline":"...","text":"..."}],
  "storyFrames": [{"text":"...","cta":"..."}],
  "hashtags": ["hashtag1", "hashtag2"],
  "imagePrompt": "Beschreibung für ein professionelles Foto passend zum Artikel",
  "cta": "Kostenloses Angebot anfordern"
}`;

  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'KI nicht konfiguriert. Bitte ANTHROPIC_API_KEY setzen.' },
        { status: 503 }
      );
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: 2048,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('[social/generate-from-blog]', err);
      return NextResponse.json({ error: 'KI-Fehler. Bitte erneut versuchen.' }, { status: 502 });
    }

    const data = await response.json();
    const text: string = data.content?.[0]?.text || '';

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json(
        { error: 'KI-Antwort konnte nicht geparst werden.' },
        { status: 502 }
      );
    }

    const result = JSON.parse(jsonMatch[0]);
    return NextResponse.json({ ok: true, content: result });
  } catch (error) {
    console.error('[social/generate-from-blog]', error);
    return NextResponse.json({ error: 'Interner Fehler.' }, { status: 500 });
  }
}
