import BookCard from '../../../../components/BookCard/BookCard';
import useOrders from '../../../../hooks/useOrders';
import styles from './OrdersSection.module.css';

function OrderCard({ order }) {
  return (
    <BookCard
      title={order.book.title}
      price={order.book.price}
      to={`/books/${order.bookId}`}
    />
  );
}

function OrdersSection() {
  const { orders, isLoading, error } = useOrders();

  const active = orders.filter((order) => order.status === 'active');
  const archive = orders.filter((order) => order.status === 'archive');

  return (
    <div className={styles.wrap}>
      {isLoading && <p>Завантаження...</p>}
      {error && <p>Не вдалося завантажити замовлення: {error}</p>}
      <h2 className={styles.heading}>Active</h2>
      <div className={styles.grid}>
        {active.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
      <h2 className={styles.heading}>Archive</h2>
      <div className={styles.grid}>
        {archive.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}

export default OrdersSection;
