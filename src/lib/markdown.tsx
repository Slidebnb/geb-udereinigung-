import React from 'react';

// Tags and attributes allowed in AI-generated blog HTML
const ALLOWED_TAGS = new Set(['p','h2','h3','h4','h5','ul','ol','li','strong','em','b','i','a','br','blockquote','article','section','div','span','figure','figcaption','table','thead','tbody','tr','th','td']);
const DANGEROUS_ATTR = /^(on\w+|style|class|id|data-)/i;
const DANGEROUS_PROTO = /^(javascript|vbscript|data):/i;

function sanitizeHtml(html: string): string {
  // Strip script and style blocks entirely
  let clean = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '');

  // Remove dangerous attributes from all tags
  clean = clean.replace(/<([a-z][a-z0-9]*)\s([^>]*?)>/gi, (match, tag, attrs) => {
    if (!ALLOWED_TAGS.has(tag.toLowerCase())) return '';
    const safeAttrs = attrs.replace(/(\w[\w-]*)(\s*=\s*["']?([^"'>\s]*)["']?)?/gi, (a: string, name: string, _eq: string, val: string = '') => {
      if (DANGEROUS_ATTR.test(name)) return '';
      if (name.toLowerCase() === 'href' && DANGEROUS_PROTO.test(val.trim())) return '';
      return a;
    });
    return `<${tag} ${safeAttrs}>`;
  });

  // Remove disallowed closing tags
  clean = clean.replace(/<\/([a-z][a-z0-9]*)\s*>/gi, (match, tag) =>
    ALLOWED_TAGS.has(tag.toLowerCase()) ? match : ''
  );

  return clean;
}

function isHtml(content: string): boolean {
  return /<[a-z][\s\S]*>/i.test(content.trim().slice(0, 300));
}

export function renderMarkdown(content: string): React.ReactNode {
  if (isHtml(content)) {
    return (
      <div
        className="prose-html"
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }}
      />
    );
  }

  const lines = content.split('\n');
  const blocks: React.ReactNode[] = [];
  let listItems: string[] = [];
  let key = 0;

  const flushList = () => {
    if (listItems.length > 0) {
      blocks.push(
        <ul key={`ul-${key++}`} className="list-disc pl-6 space-y-2 mb-5 text-gray-600">
          {listItems.map((item, i) => <li key={i}>{renderInline(item)}</li>)}
        </ul>
      );
      listItems = [];
    }
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (line.startsWith('### ')) {
      flushList();
      blocks.push(<h3 key={key++} className="text-xl font-bold text-dark mt-8 mb-3">{renderInline(line.slice(4))}</h3>);
    } else if (line.startsWith('## ')) {
      flushList();
      blocks.push(<h2 key={key++} className="text-2xl font-bold text-dark mt-10 mb-4">{renderInline(line.slice(3))}</h2>);
    } else if (line.startsWith('# ')) {
      flushList();
      blocks.push(<h2 key={key++} className="text-2xl font-bold text-dark mt-10 mb-4">{renderInline(line.slice(2))}</h2>);
    } else if (line.startsWith('- ')) {
      listItems.push(line.slice(2));
    } else if (line.match(/^\d+\.\s/)) {
      listItems.push(line.replace(/^\d+\.\s/, ''));
    } else if (line === '') {
      flushList();
    } else {
      flushList();
      blocks.push(<p key={key++} className="text-gray-600 leading-relaxed mb-5">{renderInline(line)}</p>);
    }
  }
  flushList();

  return <>{blocks}</>;
}

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold text-gray-800">{part.slice(2, -2)}</strong>;
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}
