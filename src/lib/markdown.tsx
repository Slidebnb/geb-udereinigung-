import React from 'react';

function isHtml(content: string): boolean {
  return /<[a-z][\s\S]*>/i.test(content.trim().slice(0, 200));
}

export function renderMarkdown(content: string): React.ReactNode {
  if (isHtml(content)) {
    return (
      <div
        className="prose-html"
        dangerouslySetInnerHTML={{ __html: content }}
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
          {listItems.map((item, i) => (
            <li key={i}>{renderInline(item)}</li>
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (line.startsWith('### ')) {
      flushList();
      blocks.push(<h3 key={key++} className="text-primary mt-8 mb-3">{renderInline(line.slice(4))}</h3>);
    } else if (line.startsWith('## ')) {
      flushList();
      blocks.push(<h2 key={key++} className="text-primary mt-10 mb-4">{renderInline(line.slice(3))}</h2>);
    } else if (line.startsWith('# ')) {
      flushList();
      blocks.push(<h2 key={key++} className="text-primary mt-10 mb-4">{renderInline(line.slice(2))}</h2>);
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
      return <strong key={i} className="text-gray-800 font-semibold">{part.slice(2, -2)}</strong>;
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}
