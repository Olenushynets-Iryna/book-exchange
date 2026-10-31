import BookCard from '../../../../components/BookCard/BookCard';
import useOrders from '../../../../hooks/useOrders';
import styles from './OrdersSection.module.css';

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
          <BookCard key={order.id} title={order.title} price={order.price} />
        ))}
      </div>
      <h2 className={styles.heading}>Archive</h2>
      <div className={styles.grid}>
        {archive.map((order) => (
          <BookCard key={order.id} title={order.title} price={order.price} />
        ))}
      </div>
    </div>
  );
}

export default OrdersSection;
