import { useEffect, useState } from 'react';
import { API_URL, serverError } from '../services/api';

function useFetch(path) {
  const [result, setResult] = useState({ path: null, data: null, error: null });

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${API_URL}${path}`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw serverError(response.status);
        }
        return response.json();
      })
      .then((data) => setResult({ path, data, error: null }))
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setResult({ path, data: null, error: err.message });
      });

    return () => controller.abort();
  }, [path]);

  const isLoading = result.path !== path;

  return { data: result.data, isLoading, error: result.error };
}

export default useFetch;
