import { NavLink, Outlet } from 'react-router';
import { useTranslation } from 'react-i18next';
import styles from './SettingsSection.module.css';

const tabs = ['profile', 'security', 'notifications'];

function SettingsSection() {
  const { t } = useTranslation();

  return (
    <div>
      <nav className={styles.tabs}>
        {tabs.map((tab) => (
          <NavLink
            key={tab}
            to={tab}
            className={({ isActive }) =>
              `${styles.tab} ${isActive ? styles.tabActive : ''}`
            }
          >
            {t(`account.tabs.${tab}`)}
          </NavLink>
        ))}
      </nav>
      <div className={styles.body}>
        <Outlet />
      </div>
    </div>
  );
}

export default SettingsSection;
