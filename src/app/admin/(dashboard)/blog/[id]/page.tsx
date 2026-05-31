import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import BlogEditor from '@/components/admin/BlogEditor';

export default async function EditBlogPostPage({ params }: { params: { id: string } }) {
  const post = await prisma.blogPost.findUnique({ where: { id: params.id } }).catch(() => null);
  if (!post) notFound();

  return (
    <BlogEditor
      post={{
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: post.coverImage ?? '',
        category: post.category,
        author: post.author,
        published: post.published,
        metaTitle: post.metaTitle ?? '',
        metaDesc: post.metaDesc ?? '',
      }}
    />
  );
}
