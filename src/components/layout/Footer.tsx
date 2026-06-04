import Link from 'next/link';
import { siteConfig } from '@/lib/site';
import { getSettings, getPhone, getEmail, getCompanyName } from '@/lib/get-settings';
import TrackPhoneLink from '@/components/shared/TrackPhoneLink';

export default async function Footer() {
  const settings  = await getSettings();
  const phone     = getPhone(settings);
  const email     = getEmail(settings);
  const companyName = getCompanyName(settings);
  const address   = settings.address || `${siteConfig.address.street}, ${siteConfig.address.zip} ${siteConfig.address.city}`;
  const hours     = settings.opening_hours     || 'Mo–Fr 07:00–18:00 Uhr';
  const hoursSat  = settings.opening_hours_sat || 'Sa 08:00–14:00 Uhr';

  return (
    <footer style={{ background: 'linear-gradient(180deg, #0C2340 0%, #091B33 100%)' }}>
      {/* Main grid */}
      <div className="container mx-auto pt-16 pb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="lg:col-span-1">
          <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
            <svg width="40" height="36" viewBox="0 0 42 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 2L6 16h6v18h18V16h6L21 2z" fill="#4BB8F5" opacity="0.9"/>
              <path d="M21 2L30 11l8 5-7-7-10-7z" fill="#2DC94E"/>
            </svg>
            <div>
              <div className="font-black text-white text-xl leading-none tracking-wide">HUWA</div>
              <div className="text-[10px] text-blue-400/60 leading-none tracking-widest uppercase">Gebäudereinigung</div>
            </div>
          </Link>
          <p className="text-blue-300/50 text-sm leading-relaxed mb-6 max-w-xs">
            Ihr zuverlässiger Partner für professionelle Gebäudereinigung und Hausmeisterdienste in Neuwied, Koblenz und Bendorf. Seit {siteConfig.foundingYear}.
          </p>
          <div className="flex gap-3">
            <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
               className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-300/60 hover:text-primary hover:border-primary/40 transition-all duration-200">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
            </a>
            <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
               className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-300/60 hover:text-primary hover:border-primary/40 transition-all duration-200">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>
            </a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-widest">Leistungen</h4>
          <ul className="space-y-2.5">
            {[
              ['Gebäudereinigung',    '/leistungen/gebaeudereinigung'],
              ['Büroreinigung',       '/leistungen/bueroeinigung'],
              ['Glasreinigung',       '/leistungen/glasreinigung'],
              ['Grundreinigung',      '/leistungen/grundreinigung'],
              ['Unterhaltsreinigung', '/leistungen/unterhaltsreinigung'],
              ['Baureinigung',        '/leistungen/baureinigung'],
              ['Treppenhausreinigung','/leistungen/treppenhausreinigung'],
              ['Hausmeisterdienste',  '/leistungen/hausmeisterdienste'],
              ['Winterdienst',        '/leistungen/winterdienst'],
              ['Gartenarbeiten',      '/leistungen/gartenarbeiten'],
            ].map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="text-blue-300/50 hover:text-primary text-sm transition-colors duration-150 flex items-center gap-1.5 group">
                  <svg className="w-3 h-3 text-primary/40 group-hover:text-primary transition-colors" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/></svg>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-widest">Unternehmen</h4>
          <ul className="space-y-2.5">
            {[
              ['Über uns',         '/ueber-uns'],
              ['Blog & Ratgeber',  '/blog'],
              ['FAQ',              '/faq'],
              ['Kontakt',          '/kontakt'],
              ['Angebot anfragen', '/angebot'],
              ['Impressum',        '/impressum'],
              ['Datenschutz',      '/datenschutz'],
              ['AGB',              '/agb'],
            ].map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="text-blue-300/50 hover:text-primary text-sm transition-colors duration-150">{label}</Link>
              </li>
            ))}
          </ul>

          <h4 className="text-white font-bold mt-7 mb-4 text-sm uppercase tracking-widest">Tools & Service</h4>
          <ul className="space-y-2.5">
            {[
              ['📋 Haustechnik-Checkliste', '/checkliste'],
            ].map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="text-blue-300/50 hover:text-primary text-sm transition-colors duration-150">{label}</Link>
              </li>
            ))}
          </ul>

          <h4 className="text-white font-bold mt-7 mb-4 text-sm uppercase tracking-widest">Saisonangebote</h4>
          <ul className="space-y-2.5">
            <li>
              <Link href="/winterdienst-anmeldung-2026" className="flex items-center gap-2 text-amber-300/70 hover:text-amber-300 text-sm transition-colors duration-150">
                <span>❄️</span>
                <span>Winterdienst 2026/2027</span>
                <span className="text-[10px] bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded-full font-semibold">Neu</span>
              </Link>
            </li>
            <li>
              <Link href="/gartenpflege-anmeldung-2026" className="flex items-center gap-2 text-green/70 hover:text-green text-sm transition-colors duration-150">
                <span>🌿</span>
                <span>Gartenpflege 2026</span>
                <span className="text-[10px] bg-green/20 text-green px-1.5 py-0.5 rounded-full font-semibold">Neu</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-widest">Kontakt</h4>
          <address className="not-italic space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              </div>
              <span className="text-blue-300/50 leading-relaxed">{address}</span>
            </div>
            <TrackPhoneLink phone={phone} className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
              </div>
              <span className="text-blue-300/50 group-hover:text-primary transition-colors">{phone}</span>
            </TrackPhoneLink>
            <a href={`mailto:${email}`} className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-green/10 border border-green/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-green" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              </div>
              <span className="text-blue-300/50 group-hover:text-green transition-colors break-all">{email}</span>
            </a>
            <div className="pt-1">
              <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Öffnungszeiten</p>
              <p className="text-blue-300/50">{hours}</p>
              {hoursSat && <p className="text-blue-300/50">{hoursSat}</p>}
            </div>
          </address>
        </div>
      </div>

      {/* Service areas strip */}
      <div className="border-t border-white/5">
        <div className="container mx-auto py-4">
          <p className="text-blue-400/30 text-xs text-center">
            Tätig in: {siteConfig.serviceAreas.join(' · ')} und Umgebung
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/5">
        <div className="container mx-auto py-5 flex flex-wrap justify-between items-center gap-2 text-xs text-blue-400/30">
          <p>© {new Date().getFullYear()} {companyName}. Alle Rechte vorbehalten.</p>
          <div className="flex gap-5">
            <Link href="/impressum"  className="hover:text-primary transition-colors">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-primary transition-colors">Datenschutz</Link>
            <Link href="/agb"         className="hover:text-primary transition-colors">AGB</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
