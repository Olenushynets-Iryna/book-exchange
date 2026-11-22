import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import Logo from '../Logo/Logo';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import styles from './AuthHeader.module.css';

function AuthHeader() {
  const { t } = useTranslation();

  return (
    <header className={styles.header}>
      <Link to="/" aria-label={t('header.home')}>
        <Logo />
      </Link>
      <LanguageSwitcher />
    </header>
  );
}

export default AuthHeader;
