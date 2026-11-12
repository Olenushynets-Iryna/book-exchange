import useAuth from './useAuth';
import useFetch from './useFetch';

function useOrders() {
  const { user } = useAuth();
  const { data, isLoading, error } = useFetch(
    `/orders?userId=${user.id}&_expand=book`,
  );

  const orders = (data ?? []).filter((order) => order.book);

  return { orders, isLoading, error };
}

export default useOrders;
