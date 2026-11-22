import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../../i18n';
import styles from './LanguageSwitcher.module.css';

const languages = [
  { code: 'en', label: 'Eng' },
  { code: 'uk', label: 'UA' },
];

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div className={styles.switcher}>
      {languages.map((language, index) => (
        <Fragment key={language.code}>
          {index > 0 && <span className={styles.divider}></span>}
          <button
            type="button"
            className={`${styles.lang} ${i18n.language === language.code ? styles.active : ''}`}
            onClick={() => changeLanguage(language.code)}
          >
            {language.label}
          </button>
        </Fragment>
      ))}
    </div>
  );
}

export default LanguageSwitcher;
