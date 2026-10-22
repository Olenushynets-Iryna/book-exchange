import { Link } from 'react-router';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import styles from './NotFoundPage.module.css';

function NotFoundPage() {
  return (
    <MainLayout>
      <section className={styles.wrap}>
        <h1 className={styles.code}>404</h1>
        <p>Page not found</p>
        <Link to="/" className={styles.link}>
          Back to home
        </Link>
      </section>
    </MainLayout>
  );
}

export default NotFoundPage;
