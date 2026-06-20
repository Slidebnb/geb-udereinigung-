import Link from 'next/link';
import { Building2, FileText, Home, MessageSquareQuote, Sparkles } from 'lucide-react';
import { AdminPageHeader, AdminPanel } from '@/components/admin/AdminUi';

const areas = [
  { href: '/admin/homepage', title: 'Startseite', description: 'Texte und Hauptbereiche der öffentlichen Startseite verwalten.', icon: Home },
  { href: '/admin/blog', title: 'Blog & Ratgeber', description: 'Artikel erstellen, bearbeiten und veröffentlichen.', icon: FileText },
  { href: '/admin/blog/ki-erstellen', title: 'Artikelassistent', description: 'Redaktionelle Entwürfe vorbereiten und anschließend prüfen.', icon: Sparkles },
  { href: '/admin/testimonials', title: 'Kundenstimmen', description: 'Echte freigegebene Bewertungen verwalten.', icon: MessageSquareQuote },
  { href: '/admin/kundenlogos', title: 'Kundenlogos', description: 'Echte Kundenunternehmen und die bewegte Logo-Leiste verwalten.', icon: Building2 },
];

export default function InhaltePage() {
  return <><AdminPageHeader title="Inhalte" description="Öffentliche Website-Inhalte bleiben getrennt von CRM, Objekten und Vertragsdaten." /><div className="grid md:grid-cols-2 gap-5">{areas.map(area => { const Icon = area.icon; return <AdminPanel key={area.href}><Link href={area.href} className="flex gap-4 p-6 group"><div className="admin-metric-icon"><Icon size={19} /></div><div><h2 className="!text-base !tracking-normal group-hover:text-blue-700">{area.title}</h2><p className="mt-2 text-xs leading-5 text-slate-500">{area.description}</p></div></Link></AdminPanel>; })}</div></>;
}
