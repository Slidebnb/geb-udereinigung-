import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Building2, CheckCircle2, ClipboardCheck, MapPin, Phone, ShieldCheck } from 'lucide-react';
import Breadcrumb from '@/components/shared/Breadcrumb';
import CTABanner from '@/components/home/CTABanner';
import {
  generatedCityRoutes,
  getCityServiceRoute,
  localServices,
} from '@/lib/seo-routes';
import { siteConfig } from '@/lib/site';

type Params = Promise<{ cityService: string }>;

const serviceCopy = {
  gebaudereinigung: {
    audience: 'Gewerbeobjekte, Wohnanlagen, Praxen und gemeinschaftlich genutzte Gebäude',
    scope: 'Innenbereiche, Eingänge, Sanitärbereiche und ergänzende Objektflächen',
    benefit: 'ein dauerhaft gepflegtes Objekt mit klar vereinbartem Leistungsumfang',
  },
  bueroeinigung: {
    audience: 'Büros, Kanzleien, Praxen und Verwaltungsflächen',
    scope: 'Arbeitsplätze, Böden, Küchen, Sanitär- und Besprechungsräume',
    benefit: 'saubere Arbeitsplätze zu Zeiten, die Ihren Betrieb möglichst wenig stören',
  },
  treppenhausreinigung: {
    audience: 'Hausverwaltungen, WEGs und private Vermieter',
    scope: 'Treppen, Podeste, Handläufe, Eingänge und Gemeinschaftsflächen',
    benefit: 'verlässliche Reinigungsintervalle ohne wechselnde Zuständigkeiten im Haus',
  },
  hausmeisterservice: {
    audience: 'Wohnanlagen, Gewerbeimmobilien und verwaltete Objekte',
    scope: 'Objektkontrollen, kleine Instandhaltungsarbeiten und Pflege der Außenbereiche',
    benefit: 'einen festen Ansprechpartner für die laufende Betreuung Ihrer Immobilie',
  },
  winterdienst: {
    audience: 'Hausverwaltungen, Eigentümer und Gewerbebetriebe',
    scope: 'Gehwege, Zugänge, Zufahrten und vereinbarte Verkehrsflächen',
    benefit: 'planbare Saisonbetreuung mit dokumentierten Räum- und Streueinsätzen',
  },
} as const;

const cityContext: Record<string, string> = {
  andernach: 'Wir betreuen Anfragen aus Andernach mit kurzen Abstimmungswegen aus unserem regionalen Einsatzgebiet.',
  'bad-neuenahr-ahrweiler': 'Für Objekte in Bad Neuenahr-Ahrweiler stimmen wir Umfang, Intervalle und Zugangszeiten individuell ab.',
  boppard: 'In Boppard richten wir die Betreuung an Objektart, Nutzung und den gewünschten Einsatzzeiten aus.',
  lahnstein: 'Für Kunden in Lahnstein planen wir wiederkehrende und saisonale Leistungen transparent nach tatsächlichem Bedarf.',
  mayen: 'In Mayen erhalten Eigentümer, Verwaltungen und Betriebe eine persönliche Abstimmung vor dem ersten Einsatz.',
  'hoehr-grenzhausen': 'Höhr-Grenzhausen liegt in unserem erweiterten Einsatzgebiet im Westerwald; wir stimmen regelmäßige und saisonale Leistungen objektbezogen ab.',
  haiger: 'Haiger wird durch unsere familiäre Anbindung vor Ort mit abgedeckt; Anfragen prüfen wir persönlich nach Objekt, Umfang und sinnvoller Tourenplanung.',
  vallendar: 'In Vallendar betreuen wir Wohnanlagen, Gewerbeobjekte und Hausverwaltungen mit kurzen Wegen aus dem Raum Koblenz und Neuwied.',
  nauort: 'Für Nauort planen wir Reinigungs-, Hausmeister- und Winterdienstleistungen passend zur Objektlage im Westerwald.',
  westerwald: 'Im Westerwald bündeln wir Anfragen aus der Region und prüfen die passende Einsatzplanung je nach Objekt und gewünschtem Leistungsumfang.',
  puderbach: 'Puderbach gehört zu unserem erweiterten regionalen Einsatzgebiet; besonders wiederkehrende Objektbetreuung und Winterdienst lassen sich gut planen.',
  dierdorf: 'In Dierdorf stimmen wir Gebäudereinigung, Hausmeisterservice und saisonale Leistungen transparent nach Objektbedarf ab.',
};

export function generateStaticParams() {
  return generatedCityRoutes.map((route) => ({ cityService: route.path.slice(1) }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { cityService } = await params;
  const route = getCityServiceRoute(cityService);
  if (!route || !generatedCityRoutes.some((item) => item.path === `/${cityService}`)) return {};

  const title = `${route.service.label} ${route.city.name} | Huwa Gebäudedienste`;
  const description = `${route.service.label} in ${route.city.name} für Immobilien, Verwaltungen und Gewerbe. Persönliche Betreuung, klare Leistungen und kostenloses Angebot von Huwa.`;
  const url = `${siteConfig.url}/${cityService}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: 'website', images: ['/opengraph-image'] },
    twitter: { card: 'summary_large_image', title, description, images: ['/opengraph-image'] },
  };
}

export default async function CityServicePage({ params }: { params: Params }) {
  const { cityService } = await params;
  const route = getCityServiceRoute(cityService);
  if (!route || !generatedCityRoutes.some((item) => item.path === `/${cityService}`)) notFound();

  const copy = serviceCopy[route.service.key];
  const offerHref = `/angebot?service=${encodeURIComponent(route.service.offerValue)}&city=${encodeURIComponent(route.city.name)}&source=regional-page`;
  const faqs = [
    {
      question: `Was umfasst die ${route.service.label} in ${route.city.name}?`,
      answer: `Der genaue Umfang wird bei der Objektaufnahme festgelegt. Typischerweise betreuen wir ${copy.scope}. Sie erhalten ein nachvollziehbares Angebot passend zu Ihrem Objekt.`,
    },
    {
      question: `Für wen ist die Leistung in ${route.city.name} geeignet?`,
      answer: `Unser Angebot richtet sich insbesondere an ${copy.audience}. Auch individuelle Anforderungen prüfen wir gern bei einer persönlichen Abstimmung.`,
    },
    {
      question: 'Wie entsteht der Preis?',
      answer: 'Entscheidend sind Fläche, Zustand, gewünschter Leistungsumfang, Häufigkeit und Zugänglichkeit. Nach der Bedarfsklärung erhalten Sie ein transparentes, unverbindliches Angebot.',
    },
    {
      question: 'Gibt es einen festen Ansprechpartner?',
      answer: 'Ja. Für die Abstimmung und laufende Betreuung steht Ihnen ein persönlicher Ansprechpartner zur Verfügung.',
    },
  ];

  const canonical = `${siteConfig.url}/${cityService}`;
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `${route.service.label} ${route.city.name}`,
      serviceType: route.service.label,
      provider: { '@type': 'LocalBusiness', '@id': `${siteConfig.url}/#organization`, name: siteConfig.name },
      areaServed: { '@type': 'City', name: route.city.name },
      url: canonical,
      description: `${route.service.label} für Immobilien, Verwaltungen und Gewerbe in ${route.city.name}.`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Startseite', item: siteConfig.url },
        { '@type': 'ListItem', position: 2, name: 'Leistungen', item: `${siteConfig.url}/leistungen` },
        { '@type': 'ListItem', position: 3, name: `${route.service.label} ${route.city.name}`, item: canonical },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
  ];

  const related = localServices
    .filter((service) => service.key !== route.service.key)
    .map((service) => ({ label: `${service.label} ${route.city.name}`, href: `/${service.key}-${route.city.slug}` }));

  return (
    <>
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <section className="relative overflow-hidden bg-dark py-20 md:py-28">
        <div className="container mx-auto relative z-10">
          <Breadcrumb items={[{ label: 'Leistungen', href: '/leistungen' }, { label: `${route.service.label} ${route.city.name}` }]} dark />
          <div className="mt-8 max-w-3xl">
            <div className="section-label mb-4">Regional für Sie im Einsatz</div>
            <h1 className="text-white mb-5">{route.service.label} <span className="gradient-text">{route.city.name}</span></h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-8">
              Professionelle {route.service.label} für {copy.audience} in {route.city.name}. Persönlich abgestimmt, zuverlässig organisiert und transparent angeboten.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href={offerHref} className="btn-primary px-8 py-3.5">Kostenloses Angebot</Link>
              <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="btn-white px-8 py-3.5"><Phone className="w-4 h-4" />{siteConfig.phone}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container mx-auto grid lg:grid-cols-[1.15fr_0.85fr] gap-14 items-start">
          <div>
            <div className="section-label">Leistung nach Bedarf</div>
            <h2 className="mt-4 mb-6">Saubere Abläufe für Ihr Objekt in {route.city.name}</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              {cityContext[route.city.slug] ?? `Für Kunden in ${route.city.name} stimmen wir Umfang, Intervalle und Zugangszeiten individuell nach Objektbedarf ab.`}
            </p>
            <p className="text-slate-600 leading-relaxed mb-8">
              Vor dem Start klären wir Flächen, gewünschte Intervalle und besondere Anforderungen. So erhalten Sie {copy.benefit}, statt eines unklaren Pauschalpakets.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: MapPin, title: 'Regional', text: `Betreuung in ${route.city.name}` },
                { icon: ShieldCheck, title: 'Versichert', text: 'Betriebshaftpflicht vorhanden' },
                { icon: ClipboardCheck, title: 'Transparent', text: 'Leistung klar vereinbart' },
              ].map((item) => (
                <div key={item.title} className="card p-5">
                  <item.icon className="w-6 h-6 text-primary mb-3" />
                  <h3 className="text-base font-bold text-slate-800 mb-1">{item.title}</h3>
                  <p className="text-sm text-slate-500">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-7">
            <Building2 className="w-8 h-8 text-primary mb-4" />
            <h2 className="text-xl mb-5">So läuft Ihre Anfrage ab</h2>
            <ol className="space-y-5">
              {[
                ['Anfrage senden', 'Leistung, Ort und Kontaktdaten kurz übermitteln.'],
                ['Bedarf abstimmen', 'Wir klären Objekt, Flächen, Intervalle und gewünschte Zeiten.'],
                ['Angebot erhalten', 'Sie erhalten ein transparentes Angebot ohne Verpflichtung.'],
              ].map(([title, text], index) => (
                <li key={title} className="flex gap-4">
                  <span className="w-8 h-8 shrink-0 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">{index + 1}</span>
                  <div><h3 className="text-base font-bold text-slate-800">{title}</h3><p className="text-sm text-slate-500 mt-1">{text}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section-padding bg-slate-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10"><div className="section-label mx-auto w-fit">Häufige Fragen</div><h2 className="mt-4">{route.service.label} in {route.city.name}</h2></div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="card p-5 group">
                <summary className="font-semibold text-slate-800 cursor-pointer list-none flex justify-between gap-4"><span>{faq.question}</span><CheckCircle2 className="w-5 h-5 text-primary shrink-0" /></summary>
                <p className="mt-3 text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-t border-slate-100">
        <div className="container mx-auto">
          <h2 className="text-xl mb-5">Weitere Leistungen in {route.city.name}</h2>
          <div className="flex flex-wrap gap-3">{related.map((item) => <Link key={item.href} href={item.href} className="btn-outline text-sm">{item.label}</Link>)}</div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
