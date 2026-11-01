import useBookFilters from '../../hooks/useBookFilters';
import styles from './FilterBar.module.css';

const genres = [
  'Novel',
  'Fantasy',
  'Horror',
  'Mystery',
  'Thriller',
  'Adventure',
  'Fiction',
  'Science fiction',
  'History fiction',
  'Children',
  'Teenager',
  'Adult',
];

const fundraisers = [
  'Azov',
  '3 Separate Assault Brigade',
  '110th Separate Mechanized Brigade',
  '128th Mountain Assault Brigade',
  '47th Separate Mechanized Brigade',
  '59th Separate Motorized Infantry Brigade',
];

const filterNames = ['price', 'genres', 'fundraisers'];

function PricePanel({ filters, onApply }) {
  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    onApply(data.get('minPrice'), data.get('maxPrice'));
  }

  return (
    <form className={styles.price} onSubmit={handleSubmit}>
      <span className={styles.priceLabel}>From</span>
      <input
        className={styles.priceInput}
        type="number"
        name="minPrice"
        min="0"
        placeholder="0"
        defaultValue={filters.minPrice}
      />
      <span className={styles.priceLabel}>to</span>
      <input
        className={styles.priceInput}
        type="number"
        name="maxPrice"
        min="0"
        placeholder="1000"
        defaultValue={filters.maxPrice}
      />
      <button type="submit" className={styles.ok}>
        OK
      </button>
    </form>
  );
}

function FilterBar({ active, onToggle }) {
  const { filters, hasFilters, setFilters, resetFilters } = useBookFilters();

  function chooseOption(key, value) {
    setFilters({ [key]: filters[key] === value ? '' : value });
    onToggle(active);
  }

  function applyPrice(minPrice, maxPrice) {
    setFilters({ minPrice, maxPrice });
    onToggle(active);
  }

  function handleReset() {
    resetFilters();
    if (active) {
      onToggle(active);
    }
  }

  return (
    <nav className={styles.filters}>
      {filterNames.map((name) => (
        <button
          key={name}
          type="button"
          className={`${styles.item} ${active === name ? styles.itemActive : ''}`}
          aria-expanded={active === name}
          onClick={() => onToggle(name)}
        >
          {name === 'price' && 'Price'}
          {name === 'genres' && 'Genres'}
          {name === 'fundraisers' && 'Fundraisers'}
        </button>
      ))}

      {hasFilters && (
        <button type="button" className={styles.item} onClick={handleReset}>
          Reset
        </button>
      )}

      {filterNames.includes(active) && (
        <div className={styles.panel}>
          {active === 'price' && (
            <PricePanel filters={filters} onApply={applyPrice} />
          )}

          {active === 'genres' && (
            <ul className={styles.list}>
              {genres.map((genre) => (
                <li key={genre}>
                  <button
                    type="button"
                    className={`${styles.option} ${filters.genre === genre ? styles.optionActive : ''}`}
                    onClick={() => chooseOption('genre', genre)}
                  >
                    {genre}
                  </button>
                </li>
              ))}
            </ul>
          )}

          {active === 'fundraisers' && (
            <ul className={styles.list}>
              {fundraisers.map((fund) => (
                <li key={fund}>
                  <button
                    type="button"
                    className={`${styles.option} ${filters.fundraiser === fund ? styles.optionActive : ''}`}
                    onClick={() => chooseOption('fundraiser', fund)}
                  >
                    {fund}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </nav>
  );
}

export default FilterBar;
