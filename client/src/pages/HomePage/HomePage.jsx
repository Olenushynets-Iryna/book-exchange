import { useTranslation } from 'react-i18next';
import BookCard from '../../components/BookCard/BookCard';
import styles from './HomePage.module.css';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import useBooks from '../../hooks/useBooks';
import useBookFilters from '../../hooks/useBookFilters';
import { filterBooks } from '../../utils/filterBooks';

function HomePage() {
  const { t } = useTranslation();
  const { books, isLoading, error } = useBooks();
  const { filters } = useBookFilters();

  const visibleBooks = filterBooks(books, filters);

  return (
    <MainLayout>
      {isLoading && <p>{t('common.loading')}</p>}
      {error && <p>{t('home.loadFailed', { error })}</p>}
      {!isLoading && !error && visibleBooks.length === 0 && (
        <p>{t('home.nothingFound')}</p>
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
