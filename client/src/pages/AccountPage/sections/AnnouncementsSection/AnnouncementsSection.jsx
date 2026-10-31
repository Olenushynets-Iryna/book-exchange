import { Link } from 'react-router';
import BookCard from '../../../../components/BookCard/BookCard';
import useAnnouncements from '../../../../hooks/useAnnouncements';
import styles from './AnnouncementsSection.module.css';

function AnnouncementsSection() {
  const { announcements, isLoading, error } = useAnnouncements();

  return (
    <div className={styles.wrap}>
      {isLoading && <p>Завантаження...</p>}
      {error && <p>Не вдалося завантажити оголошення: {error}</p>}
      {!isLoading && !error && announcements.length === 0 && (
        <p>У вас ще немає оголошень</p>
      )}
      <div className={styles.grid}>
        {announcements.map((item) => (
          <BookCard key={item.id} title={item.title} />
        ))}
      </div>
      <Link
        to="/account/announcements/new"
        className={styles.add}
        aria-label="Add a book"
      >
        +
      </Link>
    </div>
  );
}

export default AnnouncementsSection;
