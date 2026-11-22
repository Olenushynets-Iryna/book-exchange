import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import BookCard from '../../../../components/BookCard/BookCard';
import useAnnouncements from '../../../../hooks/useAnnouncements';
import { fileUrl } from '../../../../services/api';
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
          <div key={book.id} className={styles.item}>
            <BookCard
              title={book.title}
              price={book.price}
              image={fileUrl(book.image)}
              to={`/books/${book.id}`}
            />
            <Link
              to={`/account/announcements/${book.id}/edit`}
              className={styles.edit}
            >
              {t('account.announcements.edit')}
            </Link>
          </div>
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
