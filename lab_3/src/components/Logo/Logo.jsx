import styles from './Logo.module.css';

function Logo({ size }) {
  return (
    <div className={styles.logo} style={size ? { fontSize: size } : undefined}>
      <span>B</span>
      <span className={styles.divider}></span>
      <span>E</span>
    </div>
  );
}

export default Logo;
