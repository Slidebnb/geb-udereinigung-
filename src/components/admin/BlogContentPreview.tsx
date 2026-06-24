'use client';

import { AlertCircle } from 'lucide-react';
import { hasHtmlFragments } from '@/lib/blog-content';
import { renderMarkdown } from '@/lib/markdown';

export default function BlogContentPreview({ content }: { content: string }) {
  const hasHtml = hasHtmlFragments(content);

  return (
    <div className="blog-admin-preview">
      <div className="blog-admin-preview-toolbar">
        <div>
          <strong>Artikelvorschau</strong>
          <span>So erscheint der Inhalt auf der Webseite.</span>
        </div>
        {hasHtml ? (
          <p>
            <AlertCircle size={14} />
            HTML wird automatisch bereinigt
          </p>
        ) : null}
      </div>
      <div className="blog-admin-preview-paper">
        {content.trim() ? (
          <div className="prose-content">{renderMarkdown(content)}</div>
        ) : (
          <p className="text-sm text-slate-400">Noch kein Inhalt vorhanden.</p>
        )}
      </div>
    </div>
  );
}
