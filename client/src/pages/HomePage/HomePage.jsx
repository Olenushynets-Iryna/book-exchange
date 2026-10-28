import BookCard from '../../components/BookCard/BookCard';
import styles from './HomePage.module.css';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import useBooks from '../../hooks/useBooks';

function HomePage() {
  const { books, isLoading, error } = useBooks();

  return (
    <MainLayout>
      {isLoading && <p>Завантаження...</p>}
      {error && <p>Не вдалося завантажити книги: {error}</p>}
      <section className={styles.grid}>
        {books.map((book) => (
          <BookCard
            key={book.id}
            title={book.title}
            price={book.price}
            to={`/books/${book.id}`}
          />
        ))}
      </section>
    </MainLayout>
  );
}

export default HomePage;
