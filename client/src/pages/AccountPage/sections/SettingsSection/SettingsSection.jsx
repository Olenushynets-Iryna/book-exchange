import { NavLink, Outlet } from 'react-router';
import styles from './SettingsSection.module.css';

function SettingsSection() {
  return (
    <div>
      <nav className={styles.tabs}>
        <NavLink
          to="profile"
          className={({ isActive }) =>
            `${styles.tab} ${isActive ? styles.tabActive : ''}`
          }
        >
          Profile
        </NavLink>
        <NavLink
          to="security"
          className={({ isActive }) =>
            `${styles.tab} ${isActive ? styles.tabActive : ''}`
          }
        >
          Security
        </NavLink>
        <NavLink
          to="notifications"
          className={({ isActive }) =>
            `${styles.tab} ${isActive ? styles.tabActive : ''}`
          }
        >
          Notifications
        </NavLink>
      </nav>
      <div className={styles.body}>
        <Outlet />
      </div>
    </div>
  );
}

export default SettingsSection;
