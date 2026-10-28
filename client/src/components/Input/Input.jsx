import styles from './Input.module.css';

function Input({ type = 'text', ...props }) {
  return <input className={styles.input} type={type} {...props} />;
}

export default Input;
