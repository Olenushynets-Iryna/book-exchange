import { Link } from 'react-router';
import Logo from '../Logo/Logo';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import styles from './AuthHeader.module.css';

function AuthHeader() {
  return (
    <header className={styles.header}>
      <Link to="/" aria-label="Home">
        <Logo />
      </Link>
      <LanguageSwitcher />
    </header>
  );
}

export default AuthHeader;
