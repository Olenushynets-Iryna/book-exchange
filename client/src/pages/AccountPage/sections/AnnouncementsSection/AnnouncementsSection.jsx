import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import BookCard from '../../../../components/BookCard/BookCard';
import useAnnouncements from '../../../../hooks/useAnnouncements';
import styles from './AnnouncementsSection.module.css';

function AnnouncementsSection() {
  const { t } = useTranslation();
  const { announcements, isLoading, error } = useAnnouncements();

  return (
    <div className={styles.wrap}>
      {isLoading && <p>{t('common.loading')}</p>}
      {error && <p>{t('account.announcements.loadFailed', { error })}</p>}
      {!isLoading && !error && announcements.length === 0 && (
        <p>{t('account.announcements.empty')}</p>
      )}
      <div className={styles.grid}>
        {announcements.map((book) => (
          <BookCard
            key={book.id}
            title={book.title}
            price={book.price}
            to={`/books/${book.id}`}
          />
        ))}
      </div>
      <Link
        to="/account/announcements/new"
        className={styles.add}
        aria-label={t('account.announcements.add')}
      >
        +
      </Link>
    </div>
  );
}

export default AnnouncementsSection;
