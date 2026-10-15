import BookCard from '../../components/BookCard/BookCard';
import styles from './HomePage.module.css';
import MainLayout from '../../layouts/MainLayout/MainLayout';

const books = [
  { id: 1, title: 'Sherlock Holmes', price: 650 },
  { id: 2, title: 'Five little pigs', price: 350 },
  { id: 3, title: 'Love hypothesis', price: 540 },
  { id: 4, title: 'House of strange children', price: 300 },
  { id: 5, title: 'Lockwood & Co Corporation', price: 540 },
  { id: 6, title: 'Alice in Wonderland', price: 420 },
];

function HomePage() {
  return (
    <MainLayout>
      <section className={styles.grid}>
        {books.map((book) => (
          <BookCard key={book.id} title={book.title} price={book.price} />
        ))}
      </section>
    </MainLayout>
  );
}

export default HomePage;
