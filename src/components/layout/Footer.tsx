import Link from 'next/link';
import { siteConfig } from '@/lib/site';
import { getSettings, getPhone, getEmail, getCompanyName } from '@/lib/get-settings';

export default async function Footer() {
  const settings = await getSettings();

  const phone = getPhone(settings);
  const email = getEmail(settings);
  const companyName = getCompanyName(settings);
  const address = settings.address || `${siteConfig.address.street}, ${siteConfig.address.zip} ${siteConfig.address.city}`;
  const openingHours = settings.opening_hours || 'Mo–Fr 07:00–18:00 Uhr';
  const openingHoursSat = settings.opening_hours_sat || 'Sa 08:00–14:00 Uhr';

  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Company */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/></svg>
            </div>
            <div>
              <div className="font-bold text-lg">{companyName.split(' ')[0] || 'HUWA'}</div>
              <div className="text-xs text-blue-200">Gebäudereinigung & Hausmeister</div>
            </div>
          </div>
          <p className="text-blue-200 text-sm leading-relaxed mb-4">
            Ihr zuverlässiger Partner für professionelle Gebäudereinigung und Hausmeisterdienste in {siteConfig.address.city} und Umgebung seit {siteConfig.foundingYear}.
          </p>
          <div className="flex gap-3">
            <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-blue-800 rounded-lg flex items-center justify-center hover:bg-accent transition-colors" aria-label="Facebook">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
            </a>
            <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-blue-800 rounded-lg flex items-center justify-center hover:bg-accent transition-colors" aria-label="Instagram">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" stroke="white" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-bold text-lg mb-4 text-accent">Leistungen</h3>
          <ul className="space-y-2">
            {[
              ['Gebäudereinigung', '/leistungen/gebaeudereinigung'],
              ['Büroreinigung', '/leistungen/bueroeinigung'],
              ['Glasreinigung', '/leistungen/glasreinigung'],
              ['Grundreinigung', '/leistungen/grundreinigung'],
              ['Baureinigung', '/leistungen/baureinigung'],
              ['Hausmeisterdienste', '/leistungen/hausmeisterdienste'],
              ['Winterdienst', '/leistungen/winterdienst'],
              ['Gartenarbeiten', '/leistungen/gartenarbeiten'],
            ].map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="text-blue-200 hover:text-accent text-sm transition-colors flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-accent" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/></svg>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-bold text-lg mb-4 text-accent">Unternehmen</h3>
          <ul className="space-y-2">
            {[
              ['Über uns', '/ueber-uns'],
              ['Referenzen', '/referenzen'],
              ['Blog', '/blog'],
              ['FAQ', '/faq'],
              ['Kontakt', '/kontakt'],
              ['Angebot anfordern', '/angebot'],
              ['Impressum', '/impressum'],
              ['Datenschutz', '/datenschutz'],
              ['AGB', '/agb'],
            ].map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="text-blue-200 hover:text-accent text-sm transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-bold text-lg mb-4 text-accent">Kontakt</h3>
          <address className="not-italic space-y-3 text-sm text-blue-200">
            <div className="flex items-start gap-2.5">
              <svg className="w-4 h-4 text-accent mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              <span>{address}</span>
            </div>
            <a href={`tel:${phone}`} className="flex items-center gap-2.5 hover:text-accent transition-colors">
              <svg className="w-4 h-4 text-accent shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
              {phone}
            </a>
            <a href={`mailto:${email}`} className="flex items-center gap-2.5 hover:text-accent transition-colors">
              <svg className="w-4 h-4 text-accent shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              {email}
            </a>
            <div className="pt-2 border-t border-blue-800">
              <p className="font-medium text-white mb-1">Öffnungszeiten</p>
              <div className="space-y-0.5">
                <p>{openingHours}</p>
                {openingHoursSat && <p>{openingHoursSat}</p>}
              </div>
            </div>
          </address>
        </div>
      </div>

      {/* Served areas */}
      <div className="border-t border-blue-800">
        <div className="container mx-auto py-4">
          <p className="text-blue-300 text-xs text-center">
            Wir sind tätig in: {siteConfig.serviceAreas.join(' · ')} und Umgebung
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-blue-800">
        <div className="container mx-auto py-4 flex flex-wrap justify-between items-center gap-2 text-xs text-blue-300">
          <p>© {new Date().getFullYear()} {companyName}. Alle Rechte vorbehalten.</p>
          <div className="flex gap-4">
            <Link href="/impressum" className="hover:text-accent transition-colors">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-accent transition-colors">Datenschutz</Link>
            <Link href="/agb" className="hover:text-accent transition-colors">AGB</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
