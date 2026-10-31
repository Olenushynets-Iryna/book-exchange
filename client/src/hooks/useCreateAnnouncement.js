import { useState } from 'react';
import { API_URL } from '../services/api';
import useAuth from './useAuth';

function useCreateAnnouncement() {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  async function create(data) {
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/announcements`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, userId: user.id }),
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

  return { create, isSubmitting, error };
}

export default useCreateAnnouncement;
