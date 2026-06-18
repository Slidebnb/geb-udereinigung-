import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL;
  const adminPassword = process.env.SEED_ADMIN_PASSWORD;

  if (adminEmail && adminPassword) {
    if (adminPassword.length < 12) {
      throw new Error('SEED_ADMIN_PASSWORD must be at least 12 characters.');
    }

    const passwordHash = await bcrypt.hash(adminPassword, 12);
    await prisma.user.upsert({
      where: { email: adminEmail },
      update: { password: passwordHash, role: 'admin' },
      create: { email: adminEmail, name: 'Administrator', password: passwordHash, role: 'admin' },
    });
    console.log(`Admin user seeded: ${adminEmail}`);
  } else {
    console.warn('Skipping admin seed because SEED_ADMIN_EMAIL or SEED_ADMIN_PASSWORD is missing.');
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

Gerade in Büros mit vielen Mitarbeitern verbreiten sich Bakterien und Viren schnell. Regelmäßige professionelle Reinigung, besonders von Türgriffen, Tastaturen und gemeinsam genutzten Flächen, reduziert die Krankheitsübertragung erheblich.

## Professioneller Ersteindruck

Wenn Kunden oder Geschäftspartner Ihr Büro besuchen, zählt der erste Eindruck. Ein sauberes, gepflegtes Büro signalisiert Professionalität und Qualitätsbewusstsein.

## Unser Angebot für Ihr Büro

Bei Huwa Gebäudereinigung in Neuwied bieten wir maßgeschneiderte Büroreinigungspakete für Unternehmen im Raum Neuwied, Koblenz und Bendorf an:

- **Tägliche Unterhaltsreinigung**: Böden, Oberflächen, Küche, Sanitäranlagen
- **Wöchentliche Intensivreinigung**: Fenster, schwer zugängliche Stellen
- **Monatliche Grundreinigung**: Tiefenreinigung aller Bereiche

Fordern Sie jetzt Ihr kostenloses Angebot an!`,
      category: 'Büroreinigung',
      metaTitle: 'Professionelle Büroreinigung Neuwied & Koblenz | Huwa Gebäudereinigung',
      metaDesc: 'Warum professionelle Büroreinigung sich lohnt: Mehr Produktivität, weniger Krankheitstage. Huwa Reinigung – Neuwied, Koblenz, Bendorf. Kostenlos anfragen!',
    },
    {
      title: 'Winterdienst: Was Eigentümer und Vermieter wissen müssen',
      slug: 'winterdienst-pflichten-eigentuemer-vermieter',
      excerpt: 'Als Eigentümer oder Vermieter sind Sie gesetzlich zur Verkehrssicherung verpflichtet. Erfahren Sie, welche Pflichten Sie haben und wie professioneller Winterdienst Sie schützt.',
      content: `# Winterdienst: Was Eigentümer und Vermieter wissen müssen

Mit dem Winter kommt auch die gesetzliche Räum- und Streupflicht. Als Eigentümer, Vermieter oder Hausverwaltung sind Sie verantwortlich dafür, dass Gehwege und Zugänge zu Ihren Gebäuden sicher passierbar sind.

## Die gesetzliche Räum- und Streupflicht

In Deutschland sind Grundstückseigentümer verpflichtet, die angrenzenden öffentlichen Gehwege zu räumen und zu streuen. Die genauen Regelungen variieren je nach Gemeinde, aber grundsätzlich gilt:

- **Werktage**: Ab 7:00 Uhr bis 20:00 Uhr muss der Gehweg passierbar sein
- **Sonn- und Feiertage**: Ab 8:00 oder 9:00 Uhr (je nach Gemeinde)
- **Streupflicht**: Bei Glatteis muss gestreut werden

## Haftungsrisiken bei Verletzungen

Wer seiner Räumpflicht nicht nachkommt, haftet für Unfälle! Wenn jemand auf einem nicht geräumten Gehweg stürzt, können Sie für Schadensersatz und Schmerzensgeld in Anspruch genommen werden.

## Unser Winterdienst-Paket

Huwa Gebäudereinigung bietet umfassende Winterdienst-Pakete für Privathaushalte, Wohnhäuser und Gewerbeimmobilien im Raum Neuwied und Koblenz. Wir räumen Schnee, streuen abstumpfende Mittel und dokumentieren jeden Einsatz.

Kontaktieren Sie uns jetzt!`,
      category: 'Winterdienst',
      metaTitle: 'Winterdienst Neuwied & Koblenz | Räum- und Streupflicht | Huwa',
      metaDesc: 'Professioneller Winterdienst in Neuwied und Koblenz. Wir übernehmen Räum- und Streupflicht, schützen Sie vor Haftung. Jetzt Angebot anfordern!',
    },
    {
      title: 'Grundreinigung vs. Unterhaltsreinigung: Was ist der Unterschied?',
      slug: 'grundreinigung-vs-unterhaltsreinigung-unterschiede',
      excerpt: 'Was ist der Unterschied zwischen Grundreinigung und Unterhaltsreinigung? Wann brauche ich welche Reinigungsart? Wir erklären es verständlich.',
      content: `# Grundreinigung vs. Unterhaltsreinigung: Was ist der Unterschied?

Viele unserer Kunden fragen sich, welche Art von Reinigung sie benötigen. Hier erklären wir den Unterschied zwischen Grundreinigung und Unterhaltsreinigung.

## Was ist eine Unterhaltsreinigung?

Die Unterhaltsreinigung umfasst die routinemäßigen Reinigungsarbeiten, die in regelmäßigen Abständen durchgeführt werden:

- Boden fegen und wischen
- Oberflächen abwischen und entstauben
- Sanitärräume reinigen und desinfizieren
- Papierkörbe leeren

## Was ist eine Grundreinigung?

Die Grundreinigung ist eine intensive Tiefenreinigung, die deutlich aufwendiger ist. Sie umfasst:

- Gründliche Reinigung aller Flächen, einschließlich schwer zugänglicher Stellen
- Entfernung von hartnäckigem Schmutz, Kalk und Ablagerungen
- Reinigung und Pflege von Böden (Wachsen, Polieren, Versiegeln)
- Intensive Sanitärreinigung und Desinfektion

## Wann welche Reinigung?

**Unterhaltsreinigung** für regelmäßige Pflege von Büros und Treppenhäusern.
**Grundreinigung** bei Einzug/Auszug, nach Renovierung oder als jährliche Intensivreinigung.

Kontaktieren Sie uns für ein individuelles Angebot – wir beraten Sie kostenlos!`,
      category: 'Reinigungswissen',
      metaTitle: 'Grundreinigung vs Unterhaltsreinigung | Huwa Neuwied & Koblenz',
      metaDesc: 'Grundreinigung oder Unterhaltsreinigung? Wir erklären den Unterschied. Huwa Gebäudereinigung – Ihr Partner in Neuwied und Koblenz.',
    },
  ];

  for (const post of posts) {
    await prisma.blogPost.upsert({ where: { slug: post.slug }, update: {}, create: post });
  }

  // Settings – only set if not already present (update:{} = don't overwrite)
  const settings = [
    { key: 'site_title', value: 'Huwa Gebäudereinigung & Hausmeisterdienste' },
    { key: 'contact_email', value: 'info@huwa-gebaeudedienste.de' },
    { key: 'phone', value: '02601 9131820' },
    { key: 'address', value: 'Mittelweg 24, 56566 Neuwied' },
    { key: 'whatsapp', value: '4915117864090' },
    { key: 'google_rating', value: '5.0' },
    { key: 'review_count', value: '' },
    { key: 'years_experience', value: '6' },
    { key: 'clients_count', value: '100+' },
    { key: 'opening_hours', value: 'Mo–Fr 07:00–18:00 Uhr' },
    { key: 'opening_hours_sat', value: 'Sa 08:00–14:00 Uhr' },
  ];

  for (const s of settings) {
    await prisma.setting.upsert({ where: { key: s.key }, update: { value: s.value }, create: s });
  }

  console.log('Seed abgeschlossen!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
