import { useState } from 'react';
import { useParams } from 'react-router';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import Button from '../../components/Button/Button';
import useBook from '../../hooks/useBook';
import styles from './BookPage.module.css';

function BookPage() {
  const { id } = useParams();
  const { book, isLoading, error } = useBook(id);
  const [expanded, setExpanded] = useState(false);

  if (isLoading) {
    return (
      <MainLayout>
        <p>Завантаження...</p>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <p>{error}</p>
      </MainLayout>
    );
  }

  const fields = [book.title, book.author, book.genre, book.fundraiser];
  const stats = [
    { value: `${book.user.donated ?? 0} UAH`, label: 'donated' },
    { value: String(book.user.booksGiven ?? 0), label: 'books given' },
  ];

  return (
    <MainLayout>
      <div className={styles.page}>
        <section className={styles.card}>
          <div className={styles.top}>
            <div className={styles.coverBlock}>
              <div className={styles.cover}></div>
              <div className={styles.dots}>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
              </div>
            </div>
            <div className={styles.details}>
              <h1 className={styles.heading}>About the book</h1>
              {fields.map((field) => (
                <p key={field} className={styles.field}>
                  {field}
                </p>
              ))}
            </div>
          </div>

          <div className={styles.plot}>
            <h2 className={styles.plotTitle}>Plot</h2>
            <p
              className={`${styles.plotText} ${expanded ? '' : styles.clamped}`}
            >
              {book.plot}
            </p>
            <button
              type="button"
              className={styles.toggle}
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? 'Show less' : 'Show more'}
            </button>
          </div>

          <div className={styles.actions}>
            <Button>Exchange</Button>
          </div>
        </section>

        <aside className={styles.seller}>
          <svg
            className={styles.avatar}
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <circle cx="24" cy="24" r="22" />
            <circle cx="24" cy="19" r="7" />
            <path d="M10 39c2-8 8-11 14-11s12 3 14 11" />
          </svg>
          <p className={styles.nickname}>{book.user.name}</p>
          <ul className={styles.stats}>
            {stats.map((stat) => (
              <li key={stat.label}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </MainLayout>
  );
}

export default BookPage;
