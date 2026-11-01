import BookCard from '../../components/BookCard/BookCard';
import styles from './HomePage.module.css';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import useBooks from '../../hooks/useBooks';
import useBookFilters from '../../hooks/useBookFilters';
import { filterBooks } from '../../utils/filterBooks';

function HomePage() {
  const { books, isLoading, error } = useBooks();
  const { filters } = useBookFilters();

  const visibleBooks = filterBooks(books, filters);

  return (
    <MainLayout>
      {isLoading && <p>Завантаження...</p>}
      {error && <p>Не вдалося завантажити книги: {error}</p>}
      {!isLoading && !error && visibleBooks.length === 0 && (
        <p>Нічого не знайдено</p>
      )}
      <section className={styles.grid}>
        {visibleBooks.map((book) => (
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
