import { useEffect, useState } from 'react';
import { API_URL, serverError } from '../services/api';

function useBooks() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${API_URL}/books`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw serverError(response.status);
        }
        return response.json();
      })
      .then((data) => {
        setBooks(data);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setError(err.message);
        setIsLoading(false);
      });

    return () => controller.abort();
  }, []);

  return { books, isLoading, error };
}

export default useBooks;
