import styles from './LanguageSwitcher.module.css';

function LanguageSwitcher() {
  return (
    <div className={styles.switcher}>
      <button type="button" className={styles.lang}>
        Eng
      </button>
      <span className={styles.divider}></span>
      <button type="button" className={styles.lang}>
        UA
      </button>
    </div>
  );
}

export default LanguageSwitcher;
