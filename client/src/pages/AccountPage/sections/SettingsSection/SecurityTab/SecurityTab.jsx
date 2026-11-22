import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import FormCard from '../../../../../components/FormCard/FormCard';
import Input from '../../../../../components/Input/Input';
import Button from '../../../../../components/Button/Button';
import useChangePassword from '../../../../../hooks/useChangePassword';
import styles from './SecurityTab.module.css';

const emptyForm = { current: '', next: '', confirm: '' };

function SecurityTab() {
  const { t } = useTranslation();
  const { changePassword, isSubmitting, error } = useChangePassword();
  const [form, setForm] = useState(emptyForm);
  const [isMismatch, setIsMismatch] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
    setIsSaved(false);
    setIsMismatch(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (isSubmitting) return;
    setIsSaved(false);

    if (form.next !== form.confirm) {
      setIsMismatch(true);
      return;
    }

    const isChanged = await changePassword(form.current, form.next);
    if (isChanged) {
      setForm(emptyForm);
      setIsSaved(true);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormCard title={t('account.security.title')}>
        <Input
          type="password"
          name="current"
          placeholder={t('account.security.current')}
          value={form.current}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="next"
          placeholder={t('account.security.new')}
          value={form.next}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="confirm"
          placeholder={t('account.security.confirm')}
          value={form.confirm}
          onChange={handleChange}
          required
        />
        {isMismatch && (
          <p className={styles.error}>{t('account.security.mismatch')}</p>
        )}
        {error && <p className={styles.error}>{error}</p>}
        {isSaved && (
          <p className={styles.success}>{t('account.security.saved')}</p>
        )}
        <Button type="submit">{t('account.security.save')}</Button>
      </FormCard>
    </form>
  );
}

export default SecurityTab;
