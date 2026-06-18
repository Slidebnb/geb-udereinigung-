import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function modernizeWinterText(value: string | null): string | null {
  if (value === null) return null;
  return value
    .replaceAll('2024/2025', '2026/2027')
    .replaceAll('2024-2025', '2026-2027')
    .replaceAll('Düsseldorf', 'Neuwied');
}

async function run() {
  const officeSlug = 'professionelle-bueroeinigung-sauberkeit-am-arbeitsplatz';
  const office = await prisma.blogPost.findUnique({ where: { slug: officeSlug } });
  if (office) {
    await prisma.blogPost.update({
      where: { id: office.id },
      data: {
        title: office.title.replaceAll('Düsseldorf', 'Neuwied'),
        excerpt: office.excerpt.replaceAll('Düsseldorf', 'Neuwied'),
        content: office.content.replaceAll('Düsseldorf', 'Neuwied'),
        metaTitle: 'Professionelle Büroreinigung in Neuwied | Huwa',
        metaDesc: 'Professionelle Büroreinigung in Neuwied und Umgebung: saubere Arbeitsplätze, flexible Intervalle und persönliche Betreuung. Jetzt Angebot anfragen.',
        targetCity: 'Neuwied',
      },
    });
  }

  const oldSlug = 'winterdienst-2024-2025-pflichten-eigentuemer-vermieter';
  const newSlug = 'winterdienst-2026-2027-pflichten-eigentuemer-vermieter';
  const [oldPost, newPost] = await Promise.all([
    prisma.blogPost.findUnique({ where: { slug: oldSlug } }),
    prisma.blogPost.findUnique({ where: { slug: newSlug } }),
  ]);
  const source = newPost ?? oldPost;

  if (source) {
    await prisma.$transaction(async (tx) => {
      await tx.blogPost.update({
        where: { id: source.id },
        data: {
          slug: newSlug,
          title: 'Winterdienst 2026/2027: Pflichten für Eigentümer und Vermieter',
          excerpt: modernizeWinterText(source.excerpt) ?? source.excerpt,
          content: modernizeWinterText(source.content) ?? source.content,
          metaTitle: 'Winterdienst 2026/2027: Pflichten für Eigentümer | Huwa',
          metaDesc: 'Winterdienst 2026/2027: Was Eigentümer, Vermieter und Hausverwaltungen zu Räumzeiten, Streupflicht und Dokumentation wissen sollten.',
          targetCity: 'Neuwied',
          targetService: 'Winterdienst',
          published: true,
        },
      });
      if (oldPost && oldPost.id !== source.id) {
        await tx.blogPost.update({ where: { id: oldPost.id }, data: { published: false } });
      }
    });
  }

  console.log('SEO backfill completed.');
}

run()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
