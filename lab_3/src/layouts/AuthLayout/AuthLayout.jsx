import styles from './AuthLayout.module.css';

function AuthLayout({ children }) {
  return <main className={styles.layout}>{children}</main>;
}

export default AuthLayout;
