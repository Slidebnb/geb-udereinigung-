import Link from 'next/link';
import { siteConfig } from '@/lib/site';

interface Crumb { label: string; href?: string; }

export default function Breadcrumb({ items, dark = false }: { items: Crumb[]; dark?: boolean }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Startseite', item: siteConfig.url },
      ...items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: item.label,
        ...(item.href ? { item: `${siteConfig.url}${item.href}` } : {}),
      })),
    ],
  };

  const base  = dark ? 'text-blue-300/50' : 'text-gray-500';
  const hover = dark ? 'hover:text-primary' : 'hover:text-primary';
  const curr  = dark ? 'text-blue-200/80 font-medium' : 'text-gray-800 font-medium';
  const sep   = dark ? 'text-blue-400/30' : 'text-gray-400';

  return (
    <nav aria-label="Breadcrumb">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ol className={`flex flex-wrap items-center gap-2 text-sm ${base}`}>
        <li><Link href="/" className={`${hover} transition-colors`}>Startseite</Link></li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            <svg className={`w-4 h-4 ${sep}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/></svg>
            {item.href ? (
              <Link href={item.href} className={`${hover} transition-colors`}>{item.label}</Link>
            ) : (
              <span className={curr}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
