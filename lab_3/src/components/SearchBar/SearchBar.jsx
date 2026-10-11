import styles from './SearchBar.module.css';

function SearchBar() {
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
        className={styles.input}
        type="search"
        placeholder="Search your book"
      />
    </label>
  );
}

export default SearchBar;
