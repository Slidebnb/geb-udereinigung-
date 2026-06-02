export default function PortalKontaktPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-[#0C2340] mb-6">Kontakt</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-bold text-[#0C2340] mb-4">Huwa Gebäudereinigung &amp; Hausmeisterdienste</h2>
          <div className="space-y-4 text-sm">
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase mb-1">Adresse</div>
              <div className="text-gray-700">Neuwied, Rheinland-Pfalz</div>
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase mb-1">Telefon</div>
              <a href="tel:+4926019131820" className="text-[#4BB8F5] font-medium hover:underline">
                02601 9131820
              </a>
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase mb-1">E-Mail</div>
              <a href="mailto:info@huwa-gebaeudedienste.de" className="text-[#4BB8F5] font-medium hover:underline">
                info@huwa-gebaeudedienste.de
              </a>
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase mb-1">Bürozeiten</div>
              <div className="text-gray-700">
                Mo–Fr: 07:00 – 18:00 Uhr<br />
                Sa: 08:00 – 14:00 Uhr
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#0C2340] rounded-xl p-6 text-white">
          <h2 className="font-bold text-lg mb-3">Haben Sie Fragen?</h2>
          <p className="text-blue-200 text-sm mb-4">
            Bei Fragen zu Ihren Reinigungsprotokollen, Ihrem Vertrag oder Terminen stehen wir Ihnen gerne zur Verfügung.
          </p>
          <div className="flex flex-col gap-3">
            <a
              href="tel:+4926019131820"
              className="flex items-center gap-3 bg-[#1B3E62] hover:bg-[#4BB8F5]/20 px-4 py-3 rounded-xl transition-colors text-sm font-medium"
            >
              <span>📞</span> Jetzt anrufen
            </a>
            <a
              href="mailto:info@huwa-gebaeudedienste.de"
              className="flex items-center gap-3 bg-[#1B3E62] hover:bg-[#4BB8F5]/20 px-4 py-3 rounded-xl transition-colors text-sm font-medium"
            >
              <span>✉️</span> E-Mail schreiben
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
