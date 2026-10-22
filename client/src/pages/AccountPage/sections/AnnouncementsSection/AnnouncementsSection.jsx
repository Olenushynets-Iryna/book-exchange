import { Link } from 'react-router';
import BookCard from '../../../../components/BookCard/BookCard';
import styles from './AnnouncementsSection.module.css';

const books = [
  { id: 1, title: 'Five little pigs', price: 350 },
  { id: 2, title: 'Love hypothesis', price: 540 },
  { id: 3, title: 'House of strange children', price: 300 },
  { id: 4, title: 'Lockwood & Co Corporation', price: 540 },
];

function AnnouncementsSection() {
  return (
    <div className={styles.wrap}>
      <div className={styles.grid}>
        {books.map((book) => (
          <BookCard key={book.id} title={book.title} price={book.price} />
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
