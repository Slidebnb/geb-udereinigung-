import { AdminPageHeader } from '@/components/admin/AdminUi';
import DocumentGenerator from '@/components/admin/document-generator/DocumentGenerator';

export default function GeneratorPage() {
  return <>
    <AdminPageHeader
      title="Modularer Vertrags- & Leistungsdokumenten-Generator"
      description="Individuelle Dokumente für Dienstleistungsbetriebe aus geprüften Leistungsmodulen erstellen, bearbeiten, speichern und als PDF ausgeben."
    />
    <DocumentGenerator />
  </>;
}
