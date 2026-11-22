import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import styles from './NotFoundPage.module.css';

function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <MainLayout>
      <section className={styles.wrap}>
        <h1 className={styles.code}>404</h1>
        <p>{t('notFound.title')}</p>
        <Link to="/" className={styles.link}>
          {t('notFound.back')}
        </Link>
      </section>
    </MainLayout>
  );
}

export default NotFoundPage;
