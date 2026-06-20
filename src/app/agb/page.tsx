import type { Metadata } from 'next';
import LegalPage from '@/components/shared/LegalPage';
import { getSettings } from '@/lib/get-settings';
import { defaultLegalTexts } from '@/lib/legal-content';
import { siteConfig } from '@/lib/site';

export const revalidate = 60;
export const metadata: Metadata = { title:'Allgemeine Geschäftsbedingungen (AGB)', description:'Allgemeine Geschäftsbedingungen von Huwa Gebäudereinigung & Hausmeisterdienste.', robots:{index:true,follow:true}, alternates:{canonical:`${siteConfig.url}/agb`} };

export default async function AgbPage(){const settings=await getSettings();return <LegalPage title="Allgemeine Geschäftsbedingungen" content={settings.legal_page_agb||defaultLegalTexts.legal_page_agb}/>;}
