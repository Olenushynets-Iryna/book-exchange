import styles from './AuthFooter.module.css';

function AuthFooter() {
  return (
    <footer className={styles.footer}>
      <span>© 2026 Book Exchange for Charity</span>
      <a className={styles.link} href="#">
        Privacy policy
      </a>
    </footer>
  );
}

export default AuthFooter;
