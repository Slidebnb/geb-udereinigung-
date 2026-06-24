import React from 'react';
import { normalizeBlogContent } from '@/lib/blog-content';

type ListMode = 'ul' | 'ol' | null;

export function renderMarkdown(content: string): React.ReactNode {
  const lines = normalizeBlogContent(content).split('\n');
  const blocks: React.ReactNode[] = [];
  let listItems: string[] = [];
  let listMode: ListMode = null;
  let key = 0;

  const flushList = () => {
    if (!listItems.length || !listMode) return;
    const Tag = listMode;
    blocks.push(
      <Tag key={`list-${key++}`} className={listMode === 'ol' ? 'blog-ordered-list' : 'blog-list'}>
        {listItems.map((item, index) => (
          <li key={index}>{renderInline(item)}</li>
        ))}
      </Tag>
    );
    listItems = [];
    listMode = null;
  };

  for (const raw of lines) {
    const line = raw.trim();

    if (!line) {
      flushList();
      continue;
    }

    if (line.startsWith('#### ')) {
      flushList();
      blocks.push(<h4 key={key++}>{renderInline(line.slice(5))}</h4>);
      continue;
    }

    if (line.startsWith('### ')) {
      flushList();
      blocks.push(<h3 key={key++}>{renderInline(line.slice(4))}</h3>);
      continue;
    }

    if (line.startsWith('## ')) {
      flushList();
      blocks.push(<h2 key={key++}>{renderInline(line.slice(3))}</h2>);
      continue;
    }

    if (line.startsWith('# ')) {
      flushList();
      blocks.push(<h2 key={key++}>{renderInline(line.slice(2))}</h2>);
      continue;
    }

    if (line.startsWith('> ')) {
      flushList();
      blocks.push(<blockquote key={key++}>{renderInline(line.slice(2))}</blockquote>);
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      if (listMode !== 'ul') flushList();
      listMode = 'ul';
      listItems.push(line.replace(/^[-*]\s+/, ''));
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      if (listMode !== 'ol') flushList();
      listMode = 'ol';
      listItems.push(line.replace(/^\d+\.\s+/, ''));
      continue;
    }

    flushList();
    blocks.push(<p key={key++}>{renderInline(line)}</p>);
  }

  flushList();
  return <>{blocks}</>;
}

function safeHref(href: string): string {
  const trimmed = href.trim();
  if (trimmed.startsWith('/') && !trimmed.startsWith('//')) return trimmed;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (/^mailto:/i.test(trimmed) || /^tel:/i.test(trimmed)) return trimmed;
  return '#';
}

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean);

  return parts.map((part, index) => {
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      return (
        <a key={index} href={safeHref(link[2])}>
          {renderInline(link[1])}
        </a>
      );
    }

    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }

    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}
