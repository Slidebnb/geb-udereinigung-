import type { Metadata } from 'next';
import LegalPage from '@/components/shared/LegalPage';
import { getSettings } from '@/lib/get-settings';
import { defaultLegalTexts } from '@/lib/legal-content';
import { siteConfig } from '@/lib/site';

export const revalidate = 60;
export const metadata: Metadata = { title:'Datenschutzerklärung', description:'Datenschutzerklärung von Huwa Gebäudereinigung & Hausmeisterdienste gemäß DSGVO.', robots:{index:true,follow:true}, alternates:{canonical:`${siteConfig.url}/datenschutz`} };

export default async function DatenschutzPage(){const settings=await getSettings();return <LegalPage title="Datenschutzerklärung" content={settings.legal_page_datenschutz||defaultLegalTexts.legal_page_datenschutz}/>;}
