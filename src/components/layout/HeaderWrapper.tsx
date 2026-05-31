import { getSettings } from '@/lib/get-settings';
import Header from './Header';

export default async function HeaderWrapper() {
  const settings = await getSettings();
  return <Header settings={settings} />;
}
