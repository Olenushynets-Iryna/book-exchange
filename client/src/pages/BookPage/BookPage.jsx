import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import Button from '../../components/Button/Button';
import useBook from '../../hooks/useBook';
import useAuth from '../../hooks/useAuth';
import useCreateOrder from '../../hooks/useCreateOrder';
import styles from './BookPage.module.css';

function BookPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { book, isLoading, error } = useBook(id);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { createOrder, isSubmitting, error: orderError } = useCreateOrder();
  const [expanded, setExpanded] = useState(false);

  if (isLoading) {
    return (
      <MainLayout>
        <p>{t('common.loading')}</p>
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

  const fields = [
    book.title,
    book.author,
    t(`genres.${book.genre}`, { defaultValue: book.genre }),
    book.fundraiser,
  ];
  const stats = [
    {
      value: t('book.donatedValue', { value: book.user.donated ?? 0 }),
      label: t('book.donated'),
    },
    {
      value: String(book.user.booksGiven ?? 0),
      label: t('book.booksGiven'),
    },
  ];
  const isOwner = isAuthenticated && book.userId === user.id;

  async function handleExchange() {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (isSubmitting) return;
    const order = await createOrder(book.id);
    if (order) {
      navigate(`/pay/${order.id}`);
    }
  }

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
              <h1 className={styles.heading}>{t('book.about')}</h1>
              {fields.map((field) => (
                <p key={field} className={styles.field}>
                  {field}
                </p>
              ))}
            </div>
          </div>

          <div className={styles.plot}>
            <h2 className={styles.plotTitle}>{t('book.plot')}</h2>
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
              {expanded ? t('book.showLess') : t('book.showMore')}
            </button>
          </div>

          <div className={styles.actions}>
            {isOwner ? (
              <p className={styles.note}>{t('book.yourBook')}</p>
            ) : (
              <Button onClick={handleExchange}>{t('book.exchange')}</Button>
            )}
            {orderError && <p className={styles.error}>{orderError}</p>}
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
