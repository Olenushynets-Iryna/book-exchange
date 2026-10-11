import AuthHeader from '../../components/AuthHeader/AuthHeader';
import styles from './AuthLayout.module.css';

function AuthLayout({ children }) {
  return (
    <div className={styles.layout}>
      <AuthHeader />
      <main className={styles.main}>{children}</main>
    </div>
  );
}

export default AuthLayout;
