import { useState } from 'react';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import Button from '../../components/Button/Button';
import styles from './BookPage.module.css';

const book = {
  title: 'The love Hypothesis',
  author: 'Ali Hazelwood',
  genre: 'Novel',
  fundraiser: '128th Mountain Assault Brigade',
  plot: 'A PhD student wants to convince her best friend that she is happy and dating someone, so she agrees to a fake relationship with a famous young professor. What starts as a simple arrangement slowly turns into something neither of them planned. The story mixes humour, science and a lot of awkward moments in a university lab.',
};

const seller = {
  nickname: 'Nickname',
  stats: [
    { value: '1200 UAH', label: 'donated' },
    { value: '8', label: 'books given' },
  ],
};

function BookPage() {
  const [expanded, setExpanded] = useState(false);

  const fields = [book.title, book.author, book.genre, book.fundraiser];

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
          <p className={styles.nickname}>{seller.nickname}</p>
          <ul className={styles.stats}>
            {seller.stats.map((stat) => (
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
