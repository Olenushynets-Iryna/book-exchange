import useAuth from './useAuth';
import useFetch from './useFetch';

function useOrders() {
  const { user } = useAuth();
  const { data, isLoading, error } = useFetch(`/orders?userId=${user.id}`);

  return { orders: data ?? [], isLoading, error };
}

export default useOrders;
