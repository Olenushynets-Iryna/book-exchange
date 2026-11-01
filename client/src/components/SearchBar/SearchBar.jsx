import useBookFilters from '../../hooks/useBookFilters';
import styles from './SearchBar.module.css';

function SearchBar() {
  const { filters, setFilters } = useBookFilters();

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      setFilters({ q: event.currentTarget.value.trim() });
    }
  }

  return (
    <label className={styles.search}>
      <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="14" cy="10" r="6" />
        <line x1="10" y1="15" x2="4" y2="21" />
      </svg>
      <input
        key={filters.q}
        className={styles.input}
        type="search"
        placeholder="Search your book"
        defaultValue={filters.q}
        onKeyDown={handleKeyDown}
      />
    </label>
  );
}

export default SearchBar;
