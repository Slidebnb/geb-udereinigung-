import Breadcrumb from '@/components/shared/Breadcrumb';
import LegalContent from '@/components/shared/LegalContent';

export default function LegalPage({ title, content }: { title:string; content:string }) {
  return <>
    <section className="bg-primary-50 border-b border-primary-100 py-8"><div className="container mx-auto"><Breadcrumb items={[{label:title}]}/><h1 className="mt-4">{title}</h1></div></section>
    <section className="section-padding"><div className="container mx-auto max-w-3xl"><LegalContent content={content}/><p className="legal-updated">Stand: {new Date().toLocaleDateString('de-DE',{month:'long',year:'numeric'})}</p></div></section>
  </>;
}
