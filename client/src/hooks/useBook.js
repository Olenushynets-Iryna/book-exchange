import { useEffect, useState } from 'react';
import i18n from '../i18n';
import { API_URL, serverError } from '../services/api';

function useBook(id) {
  const [result, setResult] = useState({ id: null, book: null, error: null });

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${API_URL}/books/${id}?_expand=user`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw response.status === 404
            ? new Error(i18n.t('errors.bookNotFound'))
            : serverError(response.status);
        }
        return response.json();
      })
      .then((book) => setResult({ id, book, error: null }))
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setResult({ id, book: null, error: err.message });
      });

    return () => controller.abort();
  }, [id]);

  const isLoading = result.id !== id;

  return { book: result.book, isLoading, error: result.error };
}

export default useBook;
