import Logo from '../Logo/Logo';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import styles from './AuthHeader.module.css';

function AuthHeader() {
  return (
    <header className={styles.header}>
      <Logo />
      <LanguageSwitcher />
    </header>
  );
}

export default AuthHeader;
