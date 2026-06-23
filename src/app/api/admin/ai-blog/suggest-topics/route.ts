import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/admin-guard';

export async function POST(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { leistung, ort, artikeltyp } = body;

  const prompt = `Erstelle 8 Blog-Themenvorschläge für eine Gebäudereinigungsfirma in Neuwied (Rheinland-Pfalz).
Firmenname: Huwa Gebäudereinigung & Hausmeisterdienste

${leistung ? `Fokus auf Leistung: ${leistung}` : 'Verschiedene Leistungen: Gebäudereinigung, Büroreinigung, Treppenhausreinigung, Glasreinigung, Grundreinigung, Hausmeisterdienste'}
${ort ? `Fokus auf Ort: ${ort}` : 'Verschiedene Orte im Raum Neuwied, Koblenz, Bendorf, Westerwald, Haiger, Höhr-Grenzhausen, Vallendar, Puderbach und Dierdorf'}
${artikeltyp ? `Artikeltyp: ${artikeltyp}` : 'Verschiedene Artikeltypen: Ratgeber, Kosten-Artikel, FAQ, Lokaler Ratgeber'}

Jeder Vorschlag soll ein gutes SEO-Potenzial haben und lokalen Bezug zur Region haben.

Antworte NUR mit validem JSON in diesem Format:
{
  "topics": [
    {
      "title": "Vollständiger Artikel-Titel",
      "keyword": "Haupt-SEO-Keyword",
      "type": "ratgeber",
      "leistung": "Leistungsbereich",
      "ort": "Ort oder Allgemein"
    }
  ]
}

Erlaubte type-Werte: ratgeber, kosten-artikel, vergleich, faq-artikel, lokaler-ratgeber`;

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
      console.error('[ai-blog/suggest-topics]', err);
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
    return NextResponse.json({ ok: true, topics: result.topics || [] });
  } catch (error) {
    console.error('[ai-blog/suggest-topics]', error);
    return NextResponse.json({ error: 'Interner Fehler.' }, { status: 500 });
  }
}
