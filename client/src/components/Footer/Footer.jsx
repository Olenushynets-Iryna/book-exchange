import { useTranslation } from 'react-i18next';
import Logo from '../Logo/Logo';
import styles from './Footer.module.css';

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Logo />
          <p className={styles.slogan}>{t('footer.slogan')}</p>
        </div>

        <div className={styles.column}>
          <h3 className={styles.heading}>{t('footer.contacts')}</h3>
          <a className={styles.link} href="mailto:hello@bookexchange.example">
            hello@bookexchange.example
          </a>
        </div>

        <div className={styles.column}>
          <h3 className={styles.heading}>{t('footer.followUs')}</h3>
          <a
            className={styles.link}
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
          <a
            className={styles.link}
            href="https://www.facebook.com/"
            target="_blank"
            rel="noreferrer"
          >
            Facebook
          </a>
        </div>

        <div className={styles.column}>
          <h3 className={styles.heading}>{t('footer.information')}</h3>
          <a className={styles.link} href="#">
            {t('footer.howItWorks')}
          </a>
          <a className={styles.link} href="#">
            {t('footer.privacy')}
          </a>
          <a className={styles.link} href="#">
            {t('footer.terms')}
          </a>
        </div>
      </div>
      <p className={styles.copy}>{t('footer.copy')}</p>
    </footer>
  );
}

export default Footer;
