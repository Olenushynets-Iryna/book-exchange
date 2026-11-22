import { useState } from 'react';
import i18n from '../i18n';
import { API_URL, serverError } from '../services/api';

function useSaveAnnouncement() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  async function save(form, photo, bookId) {
    setIsSubmitting(true);
    setError(null);
    try {
      const body = new FormData();
      for (const [key, value] of Object.entries(form)) {
        body.append(key, value);
      }
      if (photo) {
        body.append('image', photo);
      }

      const url = bookId ? `${API_URL}/books/${bookId}` : `${API_URL}/books`;

      const response = await fetch(url, {
        method: bookId ? 'PATCH' : 'POST',
        credentials: 'include',
        body,
      });
      if (response.status === 403) {
        throw new Error(i18n.t('errors.notYourBook'));
      }
      if (response.status === 409) {
        throw new Error(i18n.t('errors.bookLocked'));
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

  return { save, isSubmitting, error };
}

export default useSaveAnnouncement;
