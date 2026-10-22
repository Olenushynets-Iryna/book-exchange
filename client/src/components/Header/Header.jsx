import { useState } from 'react';
import { Link } from 'react-router';
import Logo from '../Logo/Logo';
import SearchBar from '../SearchBar/SearchBar';
import FilterBar from '../FilterBar/FilterBar';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import styles from './Header.module.css';

function Header() {
  const [openPanel, setOpenPanel] = useState(null);

  const toggle = (name) => setOpenPanel(openPanel === name ? null : name);

  return (
    <header className={styles.header}>
      <div className={styles.top}>
        <Link to="/" aria-label="Home">
          <Logo />
        </Link>
        <SearchBar />
        <div className={styles.nav}>
          <FilterBar active={openPanel} onToggle={toggle} />
          <button
            type="button"
            className={styles.settings}
            aria-label="Settings"
            aria-expanded={openPanel === 'settings'}
            onClick={() => toggle('settings')}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </button>
        </div>
      </div>
      {openPanel === 'settings' && (
        <div className={styles.bottom}>
          <span className={styles.account}>
            <Link to="/account">My account</Link> /{' '}
            <Link to="/login">Login</Link>
          </span>
          <LanguageSwitcher />
        </div>
      )}
    </header>
  );
}

export default Header;
