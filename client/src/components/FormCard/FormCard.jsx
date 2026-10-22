import styles from './FormCard.module.css';

function FormCard({ title, children }) {
  return (
    <section className={styles.card}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.body}>{children}</div>
    </section>
  );
}

export default FormCard;
