'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Breadcrumb from '@/components/shared/Breadcrumb';
import { siteConfig } from '@/lib/site';

const schema = z.object({
  name: z.string().min(2, 'Bitte geben Sie Ihren Namen ein'),
  email: z.string().email('Bitte geben Sie eine gültige E-Mail-Adresse ein'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Bitte geben Sie ein Thema ein'),
  message: z.string().min(20, 'Bitte schreiben Sie mindestens 20 Zeichen'),
});

type FormData = z.infer<typeof schema>;

export default function KontaktPage() {
  const [sent, setSent] = useState(false);
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
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto">
          <Breadcrumb items={[{ label: 'Kontakt' }]} />
          <h1 className="text-white mt-6 mb-3">Kontakt</h1>
          <p className="text-blue-200 text-lg">Wir freuen uns auf Ihre Nachricht. Antwort garantiert innerhalb von 24 Stunden.</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto grid lg:grid-cols-3 gap-12">
          {/* Contact info */}
          <div className="space-y-6">
            <div>
              <h2 className="mb-6">Kontaktinformationen</h2>
              <div className="space-y-4">
                {[
                  { icon: '📞', label: 'Telefon', value: siteConfig.phone, href: `tel:${siteConfig.phone}` },
                  { icon: '📧', label: 'E-Mail', value: siteConfig.email, href: `mailto:${siteConfig.email}` },
                  { icon: '📍', label: 'Adresse', value: `${siteConfig.address.street}, ${siteConfig.address.zip} ${siteConfig.address.city}`, href: undefined },
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-0.5">{item.label}</div>
                      {item.href ? (
                        <a href={item.href} className="font-medium text-gray-800 hover:text-primary transition-colors">{item.value}</a>
                      ) : (
                        <span className="font-medium text-gray-800">{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary rounded-xl p-6 text-white">
              <h3 className="text-white mb-3">Öffnungszeiten</h3>
              {siteConfig.openingHours.map(h => (
                <div key={h.days} className="flex justify-between text-blue-200 py-1.5 border-b border-blue-800 last:border-0">
                  <span>{h.days}</span><span className="font-medium text-white">{h.hours}</span>
                </div>
              ))}
            </div>

            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=Hallo%2C%20ich%20m%C3%B6chte%20Kontakt%20aufnehmen.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-semibold"
            >
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.554 4.103 1.523 5.83L.057 23.428a.5.5 0 00.606.665l5.765-1.512A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.875a9.864 9.864 0 01-5.022-1.373l-.36-.214-3.73.978.996-3.639-.235-.374A9.864 9.864 0 012.125 12C2.125 6.554 6.554 2.125 12 2.125S21.875 6.554 21.875 12 17.446 21.875 12 21.875z"/></svg>
              <div>
                <div>Per WhatsApp schreiben</div>
                <div className="text-green-100 text-xs font-normal">Schnelle Antwort garantiert</div>
              </div>
            </a>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2">
            <h2 className="mb-6">Nachricht schreiben</h2>
            {sent ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-green-800 mb-2">Vielen Dank für Ihre Nachricht!</h3>
                <p className="text-green-700">Wir werden uns innerhalb von 24 Stunden bei Ihnen melden.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="label">Name *</label>
                    <input {...register('name')} className="input-field" placeholder="Max Mustermann" />
                    {errors.name && <p className="form-error">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="label">E-Mail *</label>
                    <input {...register('email')} type="email" className="input-field" placeholder="max@beispiel.de" />
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
                  {isSubmitting ? 'Wird gesendet...' : 'Nachricht senden'}
                </button>
                <p className="text-xs text-gray-400 text-center">
                  Mit dem Absenden stimmen Sie unserer <a href="/datenschutz" className="underline">Datenschutzerklärung</a> zu.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="h-64 bg-gray-200 flex items-center justify-center">
        <div className="text-center text-gray-600">
          <div className="text-4xl mb-2">📍</div>
          <p className="font-medium">{siteConfig.address.street}, {siteConfig.address.zip} {siteConfig.address.city}</p>
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(`${siteConfig.address.street} ${siteConfig.address.city}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-primary underline text-sm"
          >
            In Google Maps öffnen →
          </a>
        </div>
      </section>
    </>
  );
}
