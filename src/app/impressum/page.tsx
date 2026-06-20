import type { Metadata } from 'next';
import LegalPage from '@/components/shared/LegalPage';
import { getSettings } from '@/lib/get-settings';
import { defaultLegalTexts } from '@/lib/legal-content';
import { siteConfig } from '@/lib/site';

export const revalidate = 60;
export const metadata: Metadata = { title:'Impressum', description:'Impressum und Anbieterkennzeichnung von Huwa Gebäudereinigung & Hausmeisterdienste.', robots:{index:true,follow:true}, alternates:{canonical:`${siteConfig.url}/impressum`} };

export default async function ImpressumPage(){const settings=await getSettings();return <LegalPage title="Impressum" content={settings.legal_page_impressum||defaultLegalTexts.legal_page_impressum}/>;}
