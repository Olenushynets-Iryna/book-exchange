import BookCard from '../../../../components/BookCard/BookCard';
import styles from './OrdersSection.module.css';

const active = [
  { id: 1, title: 'Five little pigs', price: 350 },
  { id: 2, title: 'Love hypothesis', price: 540 },
];

const archive = [
  { id: 3, title: 'House of strange children', price: 300 },
  { id: 4, title: 'Lockwood & Co Corporation', price: 540 },
];

function OrdersSection() {
  return (
    <div className={styles.wrap}>
      <h2 className={styles.heading}>Active</h2>
      <div className={styles.grid}>
        {active.map((book) => (
          <BookCard key={book.id} title={book.title} price={book.price} />
        ))}
      </div>
      <h2 className={styles.heading}>Archive</h2>
      <div className={styles.grid}>
        {archive.map((book) => (
          <BookCard key={book.id} title={book.title} price={book.price} />
        ))}
      </div>
    </div>
  );
}

export default OrdersSection;
