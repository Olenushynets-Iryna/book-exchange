import { useState } from 'react';
import ProfileTab from './ProfileTab/ProfileTab';
import SecurityTab from './SecurityTab/SecurityTab';
import NotificationsTab from './NotificationsTab/NotificationsTab';
import styles from './SettingsSection.module.css';

const tabs = [
  { id: 'profile', label: 'Profile', Component: ProfileTab },
  { id: 'security', label: 'Security', Component: SecurityTab },
  { id: 'notifications', label: 'Notifications', Component: NotificationsTab },
];

function SettingsSection() {
  const [activeTab, setActiveTab] = useState('profile');
  const ActiveComponent = tabs.find((tab) => tab.id === activeTab).Component;

  return (
    <div>
      <nav className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      <div className={styles.body}>
        <ActiveComponent />
      </div>
    </div>
  );
}

export default SettingsSection;
