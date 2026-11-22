import { useState } from 'react';
import i18n from '../i18n';
import { API_URL, serverError } from '../services/api';

function useCreateOrder() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  async function createOrder(bookId) {
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ bookId }),
      });
      if (response.status === 403) {
        throw new Error(i18n.t('errors.ownBook'));
      }
      if (response.status === 404) {
        throw new Error(i18n.t('errors.bookNotFound'));
      }
      if (response.status === 409) {
        throw new Error(i18n.t('errors.alreadyOrdered'));
      }
      if (!response.ok) {
        throw serverError(response.status);
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
