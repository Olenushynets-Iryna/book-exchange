import styles from './Logo.module.css';

function Logo() {
  return (
    <div className={styles.logo}>
      <span>B</span>
      <span className={styles.divider}></span>
      <span>E</span>
    </div>
  );
}

export default Logo;
