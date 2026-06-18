import type { ReactNode } from 'react';

export function AdminPageHeader({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="admin-page-header">
      <div><h1>{title}</h1>{description ? <p>{description}</p> : null}</div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export function AdminPanel({ title, description, action, children, className = '' }: { title?: string; description?: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={`admin-panel ${className}`}>
      {title || action ? <div className="admin-panel-head"><div>{title ? <h2>{title}</h2> : null}{description ? <p>{description}</p> : null}</div>{action}</div> : null}
      {children}
    </section>
  );
}

export function AdminMetric({ label, value, detail, icon }: { label: string; value: string | number; detail?: string; icon?: ReactNode }) {
  return <div className="admin-metric"><div className="admin-metric-icon">{icon}</div><div><span>{label}</span><strong>{value}</strong>{detail ? <small>{detail}</small> : null}</div></div>;
}

export function AdminStatus({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'info' }) {
  return <span className={`admin-status admin-status-${tone}`}>{children}</span>;
}

export function EmptyState({ title, text }: { title: string; text: string }) {
  return <div className="admin-empty"><strong>{title}</strong><p>{text}</p></div>;
}
