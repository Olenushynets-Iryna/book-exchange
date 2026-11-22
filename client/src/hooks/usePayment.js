import { useState } from 'react';
import i18n from '../i18n';
import { API_URL, serverError } from '../services/api';

function usePayment() {
  const [isPaying, setIsPaying] = useState(false);
  const [error, setError] = useState(null);

  async function payOrder(orderId) {
    setIsPaying(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/orders/${orderId}/pay`, {
        method: 'POST',
        credentials: 'include',
      });
      if (response.status === 409) {
        throw new Error(i18n.t('errors.alreadyOrdered'));
      }
      if (!response.ok) {
        throw serverError(response.status);
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
      const response = await fetch(`${API_URL}/orders/${orderId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) {
        throw serverError(response.status);
      }
    } catch {
      setError(i18n.t('errors.cancelFailed'));
    }
  }

  return { payOrder, cancelOrder, isPaying, error };
}

export default usePayment;
