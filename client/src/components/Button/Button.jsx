import styles from './Button.module.css';

function Button({ children, type = 'button', icon, onClick }) {
  return (
    <button className={styles.button} type={type} onClick={onClick}>
      {icon && <img className={styles.icon} src={icon} alt="" />}
      {children}
    </button>
  );
}

export default Button;
