import { useTranslation } from 'react-i18next';
import useBookFilters from '../../hooks/useBookFilters';
import styles from './FilterBar.module.css';
import { genres, fundraisers } from '../../constants/options';

const filterNames = ['price', 'genres', 'fundraisers'];

function PricePanel({ filters, onApply }) {
  const { t } = useTranslation();

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    onApply(data.get('minPrice'), data.get('maxPrice'));
  }

  return (
    <form className={styles.price} onSubmit={handleSubmit}>
      <span className={styles.priceLabel}>{t('filters.from')}</span>
      <input
        className={styles.priceInput}
        type="number"
        name="minPrice"
        min="0"
        placeholder="0"
        defaultValue={filters.minPrice}
      />
      <span className={styles.priceLabel}>{t('filters.to')}</span>
      <input
        className={styles.priceInput}
        type="number"
        name="maxPrice"
        min="0"
        placeholder="1000"
        defaultValue={filters.maxPrice}
      />
      <button type="submit" className={styles.ok}>
        {t('filters.ok')}
      </button>
    </form>
  );
}

function FilterBar({ active, onToggle }) {
  const { t } = useTranslation();
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
          {t(`filters.${name}`)}
        </button>
      ))}

      {hasFilters && (
        <button type="button" className={styles.item} onClick={handleReset}>
          {t('filters.reset')}
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
                    {t(`genres.${genre}`)}
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
                    {t(`fundraisers.${fund}`)}
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
