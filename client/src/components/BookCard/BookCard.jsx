import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import styles from './BookCard.module.css';

function BookCard({ title, price, image, to }) {
  const { t } = useTranslation();

  const card = (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        {image && <img className={styles.image} src={image} alt={title} />}
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        {price && (
          <span className={styles.price}>{t('card.price', { price })}</span>
        )}
      </div>
    </article>
  );
  return to ? <Link to={to}>{card}</Link> : card;
}

export default BookCard;
