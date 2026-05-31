'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Breadcrumb from '@/components/shared/Breadcrumb';
import { siteConfig } from '@/lib/site';

const schema = z.object({
  name:    z.string().min(2, 'Bitte geben Sie Ihren Namen ein'),
  email:   z.string().email('Bitte geben Sie eine gültige E-Mail-Adresse ein'),
  phone:   z.string().optional(),
  subject: z.string().min(3, 'Bitte geben Sie ein Thema ein'),
  message: z.string().min(20, 'Bitte schreiben Sie mindestens 20 Zeichen'),
});

type FormData = z.infer<typeof schema>;

export default function KontaktPage() {
  const [sent,  setSent]  = useState(false);
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setError('');
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error();
      setSent(true);
      reset();
    } catch {
      setError('Fehler beim Senden. Bitte versuchen Sie es erneut oder rufen Sie uns an.');
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: 'radial-gradient(ellipse at 30% 50%, #0D2137 0%, #050D1A 100%)' }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(75,184,245,0.07)_0%,transparent_60%)] pointer-events-none" />
        <div className="container mx-auto relative z-10">
          <Breadcrumb items={[{ label: 'Kontakt' }]} dark />
          <div className="mt-8 max-w-2xl">
            <div className="section-label-dark mb-4">Kontakt</div>
            <h1 className="text-white mb-4">Sprechen Sie uns <span className="gradient-text">direkt an</span></h1>
            <p className="text-blue-200/70 text-lg">Wir freuen uns auf Ihre Nachricht. Antwort garantiert innerhalb von 24 Stunden – persönlich und unkompliziert.</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container mx-auto grid lg:grid-cols-3 gap-12">
          {/* Sidebar */}
          <div className="space-y-5">
            {[
              { icon: '📞', label: 'Telefon', value: siteConfig.phone, href: `tel:${siteConfig.phone}` },
              { icon: '📧', label: 'E-Mail',  value: siteConfig.email, href: `mailto:${siteConfig.email}` },
              { icon: '📍', label: 'Adresse', value: `${siteConfig.address.street}, ${siteConfig.address.zip} ${siteConfig.address.city}`, href: undefined },
            ].map(item => (
              <div key={item.label} className="card p-5 flex items-start gap-4">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <div className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-0.5">{item.label}</div>
                  {item.href ? (
                    <a href={item.href} className="font-semibold text-dark hover:text-primary transition-colors">{item.value}</a>
                  ) : (
                    <span className="font-semibold text-dark">{item.value}</span>
                  )}
                </div>
              </div>
            ))}

            {/* Opening hours */}
            <div className="rounded-2xl p-6 text-white" style={{ background: 'radial-gradient(ellipse at 30% 40%, #112B4A 0%, #050D1A 100%)' }}>
              <h3 className="text-white text-base font-bold mb-4">Öffnungszeiten</h3>
              {siteConfig.openingHours.map(h => (
                <div key={h.days} className="flex justify-between py-2 border-b border-white/10 last:border-0 text-sm">
                  <span className="text-blue-300/60">{h.days}</span>
                  <span className="font-semibold text-white">{h.hours}</span>
                </div>
              ))}
            </div>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=Hallo%2C%20ich%20m%C3%B6chte%20Kontakt%20aufnehmen.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-5 bg-green/10 border border-green/20 text-dark rounded-2xl hover:bg-green/15 transition-colors"
            >
              <svg className="w-8 h-8 text-green flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.554 4.103 1.523 5.83L.057 23.428a.5.5 0 00.606.665l5.765-1.512A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.875a9.864 9.864 0 01-5.022-1.373l-.36-.214-3.73.978.996-3.639-.235-.374A9.864 9.864 0 012.125 12C2.125 6.554 6.554 2.125 12 2.125S21.875 6.554 21.875 12 17.446 21.875 12 21.875z"/></svg>
              <div>
                <div className="font-bold text-sm">Per WhatsApp schreiben</div>
                <div className="text-gray-500 text-xs">Schnelle Antwort garantiert</div>
              </div>
            </a>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <h2 className="mb-8">Nachricht <span className="gradient-text">schreiben</span></h2>
            {sent ? (
              <div className="rounded-2xl p-10 text-center" style={{ background: 'radial-gradient(ellipse at 30% 40%, #0A1F0E 0%, #050D1A 100%)', border: '1px solid rgba(45,201,78,0.2)' }}>
                <div className="w-16 h-16 rounded-full bg-green/20 flex items-center justify-center mx-auto mb-5">
                  <svg className="w-8 h-8 text-green" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                </div>
                <h3 className="text-white text-xl font-bold mb-2">Vielen Dank für Ihre Nachricht!</h3>
                <p className="text-blue-200/60">Wir melden uns innerhalb von 24 Stunden persönlich bei Ihnen.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="label">Name *</label>
                    <input {...register('name')} className="input-field" placeholder="Ihr Name" />
                    {errors.name && <p className="form-error">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="label">E-Mail *</label>
                    <input {...register('email')} type="email" className="input-field" placeholder="ihre@email.de" />
                    {errors.email && <p className="form-error">{errors.email.message}</p>}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="label">Telefon (optional)</label>
                    <input {...register('phone')} className="input-field" placeholder="+49 170 1234567" />
                  </div>
                  <div>
                    <label className="label">Betreff *</label>
                    <input {...register('subject')} className="input-field" placeholder="z.B. Anfrage Büroreinigung" />
                    {errors.subject && <p className="form-error">{errors.subject.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="label">Nachricht *</label>
                  <textarea {...register('message')} rows={6} className="input-field resize-none" placeholder="Beschreiben Sie Ihr Anliegen..." />
                  {errors.message && <p className="form-error">{errors.message.message}</p>}
                </div>
                {error && <p className="form-error text-center">{error}</p>}
                <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed">
                  {isSubmitting ? 'Wird gesendet…' : 'Nachricht senden'}
                </button>
                <p className="text-xs text-gray-400 text-center">
                  Mit dem Absenden stimmen Sie unserer <a href="/datenschutz" className="underline hover:text-primary transition-colors">Datenschutzerklärung</a> zu.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-64 bg-gray-100 flex items-center justify-center border-t border-gray-200">
        <div className="text-center">
          <div className="text-4xl mb-3">📍</div>
          <p className="font-semibold text-dark">{siteConfig.address.street}, {siteConfig.address.zip} {siteConfig.address.city}</p>
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(`${siteConfig.address.street} ${siteConfig.address.city}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-primary hover:underline text-sm font-medium"
          >
            In Google Maps öffnen →
          </a>
        </div>
      </section>
    </>
  );
}
