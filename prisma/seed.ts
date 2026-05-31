import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Admin user
  const passwordHash = await bcrypt.hash('admin123', 12);
  await prisma.user.upsert({
    where: { email: 'admin@huwa-reinigung.de' },
    update: { password: passwordHash },
    create: { email: 'admin@huwa-reinigung.de', name: 'Administrator', password: passwordHash, role: 'admin' },
  });

  // Testimonials
  const testimonials = [
    { name: 'Markus Weber', role: 'Geschäftsführer', company: 'Weber GmbH', content: 'Huwa reinigt seit 3 Jahren unsere Büroräume. Pünktlich, gründlich und sehr zuverlässig. Wir sind rundum zufrieden!', rating: 5, location: 'Düsseldorf' },
    { name: 'Sandra Müller', role: 'Hausverwalterin', company: 'Immobilia Verwaltung', content: 'Ausgezeichneter Hausmeisterservice. Das Team reagiert sofort auf Anfragen und arbeitet sehr professionell.', rating: 5, location: 'Köln' },
    { name: 'Thomas Kirchner', role: 'Privatperson', content: 'Die Grundreinigung hat unsere Wohnung komplett verwandelt. Alles blitzt und glänzt – absolut empfehlenswert!', rating: 5, location: 'Neuss' },
    { name: 'Angela Bauer', role: 'Office Managerin', company: 'TechStart AG', content: 'Seit wir Huwa beauftragen, spart unser Team viel Zeit. Die Reinigung läuft reibungslos, immer zu unserer vollsten Zufriedenheit.', rating: 5, location: 'Düsseldorf' },
    { name: 'Peter Schmidt', role: 'Bauträger', company: 'Schmidt Bau GmbH', content: 'Huwa hat unsere Baustelle perfekt gereinigt. Schnell, effizient und zu einem fairen Preis. Klare Empfehlung!', rating: 5, location: 'Duisburg' },
    { name: 'Karin Hoffmann', role: 'Privatperson', content: 'Der Winterdienst ist Gold wert. Jeden Morgen ist der Gehweg geräumt bevor ich zur Arbeit fahre. Super Service!', rating: 5, location: 'Essen' },
  ];

  if ((await prisma.testimonial.count()) === 0) {
    for (const t of testimonials) {
      await prisma.testimonial.create({ data: t });
    }
  }

  // Blog posts
  const posts = [
    {
      title: 'Professionelle Büroreinigung: Warum Sauberkeit am Arbeitsplatz entscheidend ist',
      slug: 'professionelle-bueroeinigung-sauberkeit-am-arbeitsplatz',
      excerpt: 'Ein sauberes Büro steigert die Produktivität, reduziert Krankheitstage und hinterlässt bei Kunden einen professionellen Eindruck. Erfahren Sie, warum regelmäßige Büroreinigung sich lohnt.',
      content: `# Professionelle Büroreinigung: Warum Sauberkeit am Arbeitsplatz entscheidend ist

Ein ordentlicher und sauberer Arbeitsplatz ist weit mehr als nur ein optischer Faktor – er hat direkte Auswirkungen auf die Gesundheit, die Produktivität und das Image Ihres Unternehmens.

## Produktivität und Wohlbefinden

Studien zeigen, dass Mitarbeiter in sauberen und geordneten Arbeitsumgebungen deutlich produktiver sind. Ein aufgeräumtes Büro reduziert Ablenkungen und fördert die Konzentration. Gleichzeitig fühlen sich Mitarbeiter in einer hygienischen Umgebung wohler und sind motivierter.

## Weniger Krankheitstage

Gerade in Büros mit vielen Mitarbeitern verbreiten sich Bakterien und Viren schnell. Regelmäßige professionelle Reinigung, besonders von Türgriffen, Tastaturen und gemeinsam genutzten Flächen, reduziert die Krankheitsübertragung erheblich. Weniger Krankheitstage bedeuten weniger Kosten für Ihr Unternehmen.

## Professioneller Ersteindruck

Wenn Kunden oder Geschäftspartner Ihr Büro besuchen, zählt der erste Eindruck. Ein sauberes, gepflegtes Büro signalisiert Professionalität, Qualitätsbewusstsein und Sorgfalt – Eigenschaften, die auf Ihr gesamtes Unternehmen übertragen werden.

## Warum professionelle Reinigung?

Eigene Mitarbeiter für die Reinigung einzusetzen ist ineffizient und kostspielig. Professionelle Reinigungsunternehmen wie Huwa haben das richtige Equipment, die Fachkenntnisse und die Mittel, um eine gründliche und hygienische Reinigung zu gewährleisten – zu einem Bruchteil der Kosten einer Eigenreinigung.

## Unser Angebot für Ihr Büro

Bei Huwa Gebäudereinigung bieten wir maßgeschneiderte Büroreinigungspakete an:

- **Tägliche Unterhaltsreinigung**: Böden, Oberflächen, Küche, Sanitäranlagen
- **Wöchentliche Intensivreinigung**: Fenster, schwer zugängliche Stellen
- **Monatliche Grundreinigung**: Tiefenreinigung aller Bereiche

Fordern Sie jetzt Ihr kostenloses Angebot an und investieren Sie in die Sauberkeit und Gesundheit Ihres Unternehmens!`,
      category: 'Büroreinigung',
      metaTitle: 'Professionelle Büroreinigung Düsseldorf | Huwa Gebäudereinigung',
      metaDesc: 'Warum professionelle Büroreinigung sich lohnt: Mehr Produktivität, weniger Krankheitstage, besseres Firmenimage. Kostenlos anfragen!',
    },
    {
      title: 'Winterdienst 2024/2025: Was Eigentümer und Vermieter wissen müssen',
      slug: 'winterdienst-2024-2025-pflichten-eigentuemer-vermieter',
      excerpt: 'Als Eigentümer oder Vermieter sind Sie gesetzlich zur Verkehrssicherung verpflichtet. Erfahren Sie, welche Pflichten Sie haben und wie professioneller Winterdienst Sie schützt.',
      content: `# Winterdienst 2024/2025: Was Eigentümer und Vermieter wissen müssen

Mit dem Winter kommt auch die gesetzliche Räum- und Streupflicht. Als Eigentümer, Vermieter oder Hausverwaltung sind Sie verantwortlich dafür, dass Gehwege und Zugänge zu Ihren Gebäuden sicher passierbar sind.

## Die gesetzliche Räum- und Streupflicht

In Deutschland sind Grundstückseigentümer verpflichtet, die angrenzenden öffentlichen Gehwege zu räumen und zu streuen. Die genauen Regelungen variieren je nach Gemeinde, aber grundsätzlich gilt:

- **Werktage**: Ab 7:00 Uhr bis 20:00 Uhr muss der Gehweg passierbar sein
- **Sonn- und Feiertage**: Ab 8:00 oder 9:00 Uhr (je nach Gemeinde)
- **Streupflicht**: Bei Glatteis muss gestreut werden

## Haftungsrisiken bei Verletzungen

Wer seiner Räumpflicht nicht nachkommt, haftet für Unfälle! Wenn jemand auf einem nicht geräumten Gehweg vor Ihrem Gebäude stürzt und sich verletzt, können Sie für Schadensersatz und Schmerzensgeld in Anspruch genommen werden. Diese Kosten können erheblich sein.

## Warum professioneller Winterdienst?

Professioneller Winterdienst bietet entscheidende Vorteile:

1. **Zuverlässigkeit**: Wir räumen täglich, auch früh morgens und an Wochenenden
2. **Haftungsschutz**: Mit uns als Dienstleister dokumentieren wir alle Einsätze
3. **Kein Stress**: Sie müssen sich um nichts kümmern
4. **Kostenkontrolle**: Feste Preise, keine Überraschungen

## Unser Winterdienst-Paket

Huwa Gebäudereinigung bietet umfassende Winterdienst-Pakete für Privathaushalte, Wohnhäuser und Gewerbeimmobilien. Wir räumen Schnee, streuen abstumpfende Mittel und dokumentieren jeden Einsatz für Ihren rechtlichen Schutz.

Kontaktieren Sie uns jetzt und sichern Sie sich Ihren Platz für den Winter 2024/2025 – die Nachfrage ist hoch!`,
      category: 'Winterdienst',
      metaTitle: 'Winterdienst Düsseldorf 2024/2025 | Räum- und Streupflicht | Huwa',
      metaDesc: 'Professioneller Winterdienst in Düsseldorf. Wir übernehmen Räum- und Streupflicht, schützen Sie vor Haftung. Jetzt Angebot anfordern!',
    },
    {
      title: 'Grundreinigung vs. Unterhaltsreinigung: Was ist der Unterschied?',
      slug: 'grundreinigung-vs-unterhaltsreinigung-unterschiede',
      excerpt: 'Was ist der Unterschied zwischen Grundreinigung und Unterhaltsreinigung? Wann brauche ich welche Reinigungsart? Wir erklären es verständlich.',
      content: `# Grundreinigung vs. Unterhaltsreinigung: Was ist der Unterschied?

Viele unserer Kunden fragen sich, welche Art von Reinigung sie benötigen. Hier erklären wir den Unterschied zwischen Grundreinigung und Unterhaltsreinigung und helfen Ihnen, die richtige Wahl zu treffen.

## Was ist eine Unterhaltsreinigung?

Die Unterhaltsreinigung (auch Regelmäßige Reinigung oder Wartungsreinigung genannt) umfasst die routinemäßigen Reinigungsarbeiten, die in regelmäßigen Abständen durchgeführt werden:

- Boden fegen und wischen
- Oberflächen abwischen und entstauben
- Sanitärräume reinigen und desinfizieren
- Papierkörbe leeren
- Küchenbereiche säubern

Diese Reinigung hält Räume im gepflegten Zustand und verhindert die Ansammlung von Schmutz. Sie wird täglich, wöchentlich oder zweiwöchentlich durchgeführt.

## Was ist eine Grundreinigung?

Die Grundreinigung ist eine intensive Tiefenreinigung, die deutlich aufwendiger ist als die Unterhaltsreinigung. Sie umfasst:

- Gründliche Reinigung aller Flächen, einschließlich schwer zugänglicher Stellen
- Entfernung von hartnäckigem Schmutz, Kalk, Fett und Ablagerungen
- Reinigung und Pflege von Böden (Wachsen, Polieren, Versiegeln)
- Intensive Sanitärreinigung und Desinfektion
- Reinigung von Heizkörpern, Fenstern (innen und außen), Türen
- Entlüftungsgitter, Lichtschalter, Steckdosen
- Reinigung unter und hinter Möbeln

## Wann welche Reinigung?

**Unterhaltsreinigung** ist ideal für:
- Regelmäßige Pflege von Büros, Praxen, Geschäftsräumen
- Treppenhäuser in Mehrfamilienhäusern
- Gewerbliche Küchen und Sozialräume

**Grundreinigung** ist notwendig bei:
- Einzug oder Auszug aus einer Wohnung
- Nach Renovierungs- oder Bauarbeiten
- Als jährliche Intensivreinigung
- Übernahme einer neuen Immobilie
- Besondere Anlässe (Betriebsfeier, Inspektion)

## Unsere Empfehlung

Die beste Lösung ist eine Kombination: Regelmäßige Unterhaltsreinigung mit gelegentlichen Grundreinigungen. So bleibt Ihre Immobilie dauerhaft in Top-Zustand.

Kontaktieren Sie uns für ein individuelles Angebot – wir beraten Sie kostenlos!`,
      category: 'Reinigungswissen',
      metaTitle: 'Grundreinigung vs Unterhaltsreinigung | Was ist der Unterschied? | Huwa',
      metaDesc: 'Grundreinigung oder Unterhaltsreinigung? Wir erklären den Unterschied und helfen bei der Wahl. Kostenlose Beratung und Angebot anfordern.',
    },
  ];

  for (const post of posts) {
    await prisma.blogPost.upsert({ where: { slug: post.slug }, update: {}, create: post });
  }

  // Settings
  const settings = [
    { key: 'site_title', value: 'Huwa Gebäudereinigung & Hausmeisterdienste' },
    { key: 'contact_email', value: 'info@huwa-reinigung.de' },
    { key: 'phone', value: '+49 170 1234567' },
    { key: 'address', value: 'Musterstraße 12, 40210 Düsseldorf' },
    { key: 'whatsapp', value: '491701234567' },
    { key: 'google_rating', value: '4.9' },
    { key: 'review_count', value: '127' },
    { key: 'years_experience', value: '15' },
    { key: 'clients_count', value: '500+' },
  ];

  for (const s of settings) {
    await prisma.setting.upsert({ where: { key: s.key }, update: { value: s.value }, create: s });
  }

  console.log('✅ Seed abgeschlossen!');
  console.log('📧 Admin-Login: admin@huwa-reinigung.de');
  console.log('🔑 Passwort: admin123');
}

main().catch(console.error).finally(() => prisma.$disconnect());
