import { useState } from 'react';
import AccountSidebar from './AccountSidebar/AccountSidebar';
import SettingsSection from './sections/SettingsSection/SettingsSection';
import AnnouncementsSection from './sections/AnnouncementsSection/AnnouncementsSection';
import OrdersSection from './sections/OrdersSection/OrdersSection';
import styles from './AccountPage.module.css';

const sections = {
  settings: SettingsSection,
  announcements: AnnouncementsSection,
  orders: OrdersSection,
};

function AccountPage() {
  const [active, setActive] = useState('announcements');
  const Section = sections[active];

  return (
    <div className={styles.page}>
      <AccountSidebar active={active} onSelect={setActive} />
      <main className={styles.content}>
        <Section />
      </main>
    </div>
  );
}

export default AccountPage;
