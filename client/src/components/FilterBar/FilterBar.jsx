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

function FilterBar({ active, onToggle }) {
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

      {filterNames.includes(active) && (
        <div className={styles.panel}>
          {active === 'price' && (
            <div className={styles.price}>
              <span className={styles.priceLabel}>From</span>
              <input
                className={styles.priceInput}
                type="number"
                placeholder="0"
              />
              <span className={styles.priceLabel}>to</span>
              <input
                className={styles.priceInput}
                type="number"
                placeholder="1000"
              />
              <button
                type="button"
                className={styles.option}
                onClick={() => onToggle(active)}
              >
                OK
              </button>
            </div>
          )}

          {active === 'genres' && (
            <ul className={styles.list}>
              {genres.map((genre) => (
                <li key={genre}>
                  <button type="button" className={styles.option}>
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
                  <button type="button" className={styles.option}>
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
