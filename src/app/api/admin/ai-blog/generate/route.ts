import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { keyword, leistung, ort, zielgruppe, artikeltyp, laenge, tonalitaet } = body;

  const wordCount = laenge === 'kurz' ? 400 : laenge === 'mittel' ? 700 : 1000;
  const leistungSlug = (leistung as string)?.toLowerCase().replace(/ /g, '-') || '';

  const prompt = `Erstelle einen SEO-Blogartikel für eine Gebäudereinigungsfirma in ${ort || 'Neuwied'} (Rheinland-Pfalz).

Keyword: ${keyword}
Leistung: ${leistung}
Ort: ${ort}
Zielgruppe: ${zielgruppe}
Artikeltyp: ${artikeltyp}
Länge: ca. ${wordCount} Wörter
Tonalität: ${tonalitaet}

Firmenname: ${process.env.NEXT_PUBLIC_SITE_NAME || 'Huwa Gebäudereinigung & Hausmeisterdienste'}
Kontakt: ${process.env.NEXT_PUBLIC_PHONE || '02601 9131820'}, ${process.env.NEXT_PUBLIC_EMAIL || 'info@huwa-gebaeudedienste.de'}

Regeln:
- Keine Fake-Bewertungen, keine erfundenen Kunden
- Keine garantierten Preise
- Lokal auf ${ort} ausrichten
- Professionell und vertrauenswürdig
- CTA am Ende: Link zu /angebot oder passender Leistungsseite
- Interne Links zu: /leistungen/${leistungSlug} und passenden Ort-Seiten
- FAQ-Abschnitt mit 3-4 Fragen

Antworte NUR mit validem JSON in diesem Format:
{
  "title": "SEO-Titel des Artikels",
  "slug": "url-freundlicher-slug",
  "excerpt": "2-3 Sätze Zusammenfassung",
  "metaTitle": "Meta-Titel | Huwa Gebäudedienste",
  "metaDesc": "Meta-Description max 160 Zeichen",
  "category": "Kategorie",
  "content": "Vollständiger HTML-Artikelinhalt mit h2-Tags, Absätzen und internen Links",
  "coverImageSuggestion": "Bildidee für Titelbild"
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
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 4096,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('[ai-blog/generate]', err);
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

    let coverImage: string | null = null;
    const unsplashKey = process.env.UNSPLASH_ACCESS_KEY;
    if (unsplashKey) {
      const queryMap: Record<string, string> = {
        'Gebäudereinigung': 'building facade cleaning professional',
        'Büroreinigung': 'office cleaning professional service',
        'Treppenhausreinigung': 'apartment staircase building entrance clean',
        'Glasreinigung': 'window cleaning squeegee professional',
        'Grundreinigung': 'deep cleaning service professional',
        'Unterhaltsreinigung': 'commercial cleaning office regular service',
        'Baureinigung': 'construction site cleaning cleanup',
        'Hausmeisterdienste': 'building maintenance facility manager',
        'Winterdienst': 'snow removal winter service road',
        'Gartenarbeiten': 'garden maintenance landscaping professional',
      };
      const query = queryMap[leistung as string] || 'professional cleaning service building';
      try {
        const imgRes = await fetch(
          `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape&client_id=${unsplashKey}`,
          { headers: { 'Accept-Version': 'v1' } }
        );
        if (imgRes.ok) {
          const imgData = await imgRes.json();
          coverImage = imgData?.urls?.regular ?? null;
        }
      } catch {
        // Unsplash unavailable – continue without image
      }
    }

    return NextResponse.json({ ok: true, article: { ...result, coverImage } });
  } catch (error) {
    console.error('[ai-blog/generate]', error);
    return NextResponse.json({ error: 'Interner Fehler.' }, { status: 500 });
  }
}
