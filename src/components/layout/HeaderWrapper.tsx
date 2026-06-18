import { getSettings } from '@/lib/get-settings';
import { prisma } from '@/lib/prisma';
import Header from './Header';

export default async function HeaderWrapper() {
  const [settings, reviews] = await Promise.all([
    getSettings(),
    prisma.testimonial.aggregate({
      where: { published: true },
      _avg: { rating: true },
      _count: { id: true },
    }).catch(() => null),
  ]);

  return (
    <Header
      settings={settings}
      reviewRating={reviews?._avg.rating ?? null}
      reviewCount={reviews?._count.id ?? 0}
    />
  );
}
