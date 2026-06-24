import { PrismaClient } from '@prisma/client';
import { normalizeBlogContent } from '../src/lib/blog-content';

const prisma = new PrismaClient();
const apply = process.argv.includes('--apply');

async function main() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { publishedAt: 'desc' },
    select: { id: true, slug: true, title: true, content: true },
  });

  let changed = 0;

  for (const post of posts) {
    const normalized = normalizeBlogContent(post.content);
    if (normalized === post.content) continue;

    changed += 1;
    console.log(`${apply ? 'UPDATE' : 'DRY'} ${post.slug} - ${post.title}`);

    if (apply) {
      await prisma.blogPost.update({
        where: { id: post.id },
        data: { content: normalized },
      });
    }
  }

  console.log(`${changed} von ${posts.length} Blogartikeln ${apply ? 'bereinigt' : 'wuerden bereinigt'}.`);
  if (!apply) console.log('Zum Schreiben erneut mit --apply ausfuehren.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
