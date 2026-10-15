import { useState } from 'react';
import BookCard from '../../../../components/BookCard/BookCard';
import AnnouncementForm from './AnnouncementForm/AnnouncementForm';
import styles from './AnnouncementsSection.module.css';

const books = [
  { id: 1, title: 'Five little pigs', price: 350 },
  { id: 2, title: 'Love hypothesis', price: 540 },
  { id: 3, title: 'House of strange children', price: 300 },
  { id: 4, title: 'Lockwood & Co Corporation', price: 540 },
];

function AnnouncementsSection() {
  const [isAdding, setIsAdding] = useState(false);

  if (isAdding) {
    return (
      <div className={styles.wrap}>
        <AnnouncementForm onDone={() => setIsAdding(false)} />
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.grid}>
        {books.map((book) => (
          <BookCard key={book.id} title={book.title} price={book.price} />
        ))}
      </div>
      <button
        type="button"
        className={styles.add}
        aria-label="Add a book"
        onClick={() => setIsAdding(true)}
      >
        +
      </button>
    </div>
  );
}

export default AnnouncementsSection;
