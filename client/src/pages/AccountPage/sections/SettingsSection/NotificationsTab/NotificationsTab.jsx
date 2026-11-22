import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import FormCard from '../../../../../components/FormCard/FormCard';
import useAuth from '../../../../../hooks/useAuth';
import styles from './NotificationsTab.module.css';

const options = [
  { id: 'order', field: 'notifyOrders' },
  { id: 'fundraiser', field: 'notifyFundraisers' },
];

function NotificationsTab() {
  const { t } = useTranslation();
  const { user, updateNotifications } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const handleChange = async (field, checked) => {
    setError('');
    setIsSaving(true);
    try {
      await updateNotifications({
        notifyOrders: !!user.notifyOrders,
        notifyFundraisers: !!user.notifyFundraisers,
        [field]: checked,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <FormCard title={t('account.notifications.title')}>
      {options.map((option) => (
        <label key={option.id} className={styles.row}>
          <span>{t(`account.notifications.${option.id}`)}</span>
          <input
            className={styles.toggle}
            type="checkbox"
            checked={!!user?.[option.field]}
            disabled={isSaving}
            onChange={(e) => handleChange(option.field, e.target.checked)}
          />
        </label>
      ))}
      {error && <p className={styles.error}>{error}</p>}
    </FormCard>
  );
}

export default NotificationsTab;
