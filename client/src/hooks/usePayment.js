import { useState } from 'react';
import { API_URL } from '../services/api';

function usePayment() {
  const [isPaying, setIsPaying] = useState(false);
  const [error, setError] = useState(null);

  async function payOrder(orderId) {
    setIsPaying(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const response = await fetch(`${API_URL}/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'active' }),
      });
      if (!response.ok) {
        throw new Error(`Помилка сервера: ${response.status}`);
      }
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setIsPaying(false);
    }
  }

  async function cancelOrder(orderId) {
    try {
      await fetch(`${API_URL}/orders/${orderId}`, { method: 'DELETE' });
    } catch {
      setError('Не вдалося скасувати замовлення');
    }
  }

  return { payOrder, cancelOrder, isPaying, error };
}

export default usePayment;
