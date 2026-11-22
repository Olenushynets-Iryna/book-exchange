import { useState } from 'react';
import i18n from '../i18n';
import { API_URL, serverError } from '../services/api';

function useChangePassword() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  async function changePassword(currentPassword, newPassword) {
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/me/password`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      if (response.status === 403) {
        throw new Error(i18n.t('errors.wrongPassword'));
      }
      if (response.status === 400) {
        throw new Error(i18n.t('errors.shortPassword'));
      }
      if (!response.ok) {
        throw serverError(response.status);
      }
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }

  return { changePassword, isSubmitting, error };
}

export default useChangePassword;
