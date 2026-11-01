import { useNavigate, useParams } from 'react-router';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import FormCard from '../../components/FormCard/FormCard';
import Button from '../../components/Button/Button';
import useAuth from '../../hooks/useAuth';
import useFetch from '../../hooks/useFetch';
import usePayment from '../../hooks/usePayment';
import styles from './PaymentPage.module.css';

function PaymentPage() {
  const { orderId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    data: order,
    isLoading,
    error,
  } = useFetch(`/orders/${orderId}?_expand=book`);
  const { payOrder, cancelOrder, isPaying, error: payError } = usePayment();

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
        <p>Замовлення не знайдено ({error})</p>
      </MainLayout>
    );
  }

  if (!order.book || order.userId !== user.id || order.status !== 'pending') {
    return (
      <MainLayout>
        <p>Це замовлення недоступне для оплати</p>
      </MainLayout>
    );
  }

  async function handlePay() {
    if (isPaying) return;
    const isPaid = await payOrder(order.id);
    if (isPaid) {
      navigate('/account/orders');
    }
  }

  async function handleCancel() {
    await cancelOrder(order.id);
    navigate(`/books/${order.bookId}`);
  }

  return (
    <MainLayout>
      <div className={styles.page}>
        <FormCard title="Payment (Sandbox)">
          <p className={styles.text}>Book: {order.book.title}</p>
          <p className={styles.text}>Amount: {order.book.price} UAH</p>
          <p className={styles.note}>
            Це заглушка. Справжній платіж LiqPay (Sandbox) буде підключено разом
            із власним сервером.
          </p>
          {payError && <p className={styles.error}>{payError}</p>}
          <Button onClick={handlePay}>
            {isPaying ? 'Processing...' : 'Pay'}
          </Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </FormCard>
      </div>
    </MainLayout>
  );
}

export default PaymentPage;
