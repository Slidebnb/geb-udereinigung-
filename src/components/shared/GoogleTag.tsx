import Script from 'next/script';
import { GTAG_ID } from '@/lib/gtag';

export default function GoogleTag() {
  if (!GTAG_ID) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('consent', 'default', {
          analytics_storage: 'denied',
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
          wait_for_update: 2000
        });
        gtag('config', '${GTAG_ID}', { send_page_view: true, anonymize_ip: true });
        try {
          if (localStorage.getItem('cookie-consent') === 'accepted') {
            gtag('consent', 'update', {
              analytics_storage: 'granted',
              ad_storage: 'granted',
              ad_user_data: 'granted',
              ad_personalization: 'granted'
            });
          }
        } catch(e) {}
      `}</Script>
    </>
  );
}
