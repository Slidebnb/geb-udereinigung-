import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/admin-guard';
import { normalizeBlogContent } from '@/lib/blog-content';

export async function POST(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

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

Firmenname: Huwa Gebäudereinigung & Hausmeisterdienste
Kontakt: 02601 9131820, info@huwa-gebaeudedienste.de

Regeln:
- Keine Fake-Bewertungen, keine erfundenen Kunden
- Keine garantierten Preise
- Lokal auf ${ort} ausrichten
- Professionell, hilfreich und vertrauenswürdig
- CTA am Ende: Link zu /angebot oder passender Leistungsseite
- Interne Links zu: /leistungen/${leistungSlug} und passenden Ort-Seiten
- FAQ-Abschnitt mit 3-4 Fragen
- Schreibe den Artikelinhalt ausschließlich in sauberem Markdown
- Keine HTML-Tags wie <p>, <h1>, <h2> oder <a>
- Im content-Feld keine H1 verwenden, der Seitentitel ist bereits die H1
- Zwischenüberschriften mit ## und ### schreiben
- Interne Links als Markdown schreiben, z. B. [Angebot anfragen](/angebot)
- Kurze Absätze, klare Listen und keine Keyword-Spam-Texte

Antworte NUR mit validem JSON in diesem Format:
{
  "title": "SEO-Titel des Artikels",
  "slug": "url-freundlicher-slug",
  "excerpt": "2-3 Sätze Zusammenfassung",
  "metaTitle": "Meta-Titel | Huwa Gebäudedienste",
  "metaDesc": "Meta-Description max 160 Zeichen",
  "category": "Kategorie",
  "content": "Vollständiger Markdown-Artikelinhalt ohne HTML-Tags, mit ## Zwischenüberschriften, Listen und Markdown-Links",
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
        model: 'claude-haiku-4-5',
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
      return NextResponse.json({ error: 'KI-Antwort konnte nicht geparst werden.' }, { status: 502 });
    }

    const result = JSON.parse(jsonMatch[0]);
    result.content = normalizeBlogContent(result.content || '');
    return NextResponse.json({ ok: true, article: result });
  } catch (error) {
    console.error('[ai-blog/generate]', error);
    return NextResponse.json({ error: 'Interner Fehler.' }, { status: 500 });
  }
}
