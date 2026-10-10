import styles from './Button.module.css';

function Button({ children, type = 'button', icon }) {
  return (
    <button className={styles.button} type={type}>
      {icon && <img className={styles.icon} src={icon} alt="" />}
      {children}
    </button>
  );
}

export default Button;
