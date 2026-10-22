import styles from './AuthCard.module.css';

function AuthCard({ title, imageContent, children }) {
  return (
    <div className={styles.card}>
      <div className={styles.imagePart}>{imageContent}</div>
      <div className={styles.formPart}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}

export default AuthCard;
