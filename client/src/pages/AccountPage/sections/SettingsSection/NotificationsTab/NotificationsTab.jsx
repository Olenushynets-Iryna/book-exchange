import { useTranslation } from 'react-i18next';
import FormCard from '../../../../../components/FormCard/FormCard';
import styles from './NotificationsTab.module.css';

const options = [
  { id: 'order', checked: true },
  { id: 'fundraiser', checked: false },
];

function NotificationsTab() {
  const { t } = useTranslation();

  return (
    <FormCard title={t('account.notifications.title')}>
      {options.map((option) => (
        <label key={option.id} className={styles.row}>
          <span>{t(`account.notifications.${option.id}`)}</span>
          <input
            className={styles.toggle}
            type="checkbox"
            defaultChecked={option.checked}
          />
        </label>
      ))}
    </FormCard>
  );
}

export default NotificationsTab;
