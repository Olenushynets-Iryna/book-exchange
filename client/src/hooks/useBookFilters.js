import { useNavigate, useSearchParams } from 'react-router';

const FILTER_KEYS = ['q', 'genre', 'fundraiser', 'minPrice', 'maxPrice'];

function useBookFilters() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const filters = {
    q: searchParams.get('q') ?? '',
    genre: searchParams.get('genre') ?? '',
    fundraiser: searchParams.get('fundraiser') ?? '',
    minPrice: searchParams.get('minPrice') ?? '',
    maxPrice: searchParams.get('maxPrice') ?? '',
  };

  const hasFilters = FILTER_KEYS.some((key) => filters[key] !== '');

  function setFilters(changes) {
    const next = new URLSearchParams(searchParams);
    Object.entries(changes).forEach(([key, value]) => {
      if (value) {
        next.set(key, value);
      } else {
        next.delete(key);
      }
    });
    navigate({ pathname: '/', search: next.toString() }, { replace: true });
  }

  function resetFilters() {
    navigate('/', { replace: true });
  }

  return { filters, hasFilters, setFilters, resetFilters };
}

export default useBookFilters;
