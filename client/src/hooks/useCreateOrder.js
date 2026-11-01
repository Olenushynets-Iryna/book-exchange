import { useState } from 'react';
import { API_URL } from '../services/api';
import useAuth from './useAuth';

function useCreateOrder() {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  async function createOrder(bookId) {
    setIsSubmitting(true);
    setError(null);
    try {
      const params = new URLSearchParams({ bookId });
      const checkResponse = await fetch(`${API_URL}/orders?${params}`);
      if (!checkResponse.ok) {
        throw new Error(`Помилка сервера: ${checkResponse.status}`);
      }
      const existing = await checkResponse.json();
      if (existing.some((order) => order.status !== 'pending')) {
        throw new Error('Цю книгу вже замовлено');
      }

      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, bookId, status: 'pending' }),
      });
      if (!response.ok) {
        throw new Error(`Помилка сервера: ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setIsSubmitting(false);
    }
  }

  return { createOrder, isSubmitting, error };
}

export default useCreateOrder;
