import useAuth from './useAuth';
import useFetch from './useFetch';

function useAnnouncements() {
  const { user } = useAuth();
  const { data, isLoading, error } = useFetch(`/books?userId=${user.id}`);

  return { announcements: data ?? [], isLoading, error };
}

export default useAnnouncements;
