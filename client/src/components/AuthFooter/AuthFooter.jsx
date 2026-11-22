import { useTranslation } from 'react-i18next';
import styles from './AuthFooter.module.css';

function AuthFooter() {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <span>{t('footer.authCopy')}</span>
      <a className={styles.link} href="#">
        {t('footer.privacy')}
      </a>
    </footer>
  );
}

export default AuthFooter;
