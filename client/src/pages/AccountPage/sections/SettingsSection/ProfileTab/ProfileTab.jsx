import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import FormCard from '../../../../../components/FormCard/FormCard';
import Input from '../../../../../components/Input/Input';
import Button from '../../../../../components/Button/Button';
import PhotoUpload from '../../AnnouncementsSection/PhotoUpload/PhotoUpload';
import useAuth from '../../../../../hooks/useAuth';
import styles from './ProfileTab.module.css';

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: '1.2',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
};

const stats = [
  {
    id: 'books',
    value: 5,
    icon: (
      <svg {...iconProps}>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
  {
    id: 'stars',
    value: 12,
    icon: (
      <svg {...iconProps}>
        <path d="M12 2l3 6.9 7.5.7-5.7 5 1.7 7.4L12 18l-6.5 4 1.7-7.4-5.7-5L9 8.9z" />
      </svg>
    ),
  },
  {
    id: 'trades',
    value: 3,
    icon: (
      <svg {...iconProps}>
        <path d="M17 3l4 4-4 4M21 7H8M7 21l-4-4 4-4M3 17h13" />
      </svg>
    ),
  },
];

function ProfileTab() {
  const { t } = useTranslation();
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({
    name: user.name ?? '',
    surname: user.surname ?? '',
    birthDate: user.birthDate ?? '',
    email: user.email ?? '',
    address: user.address ?? '',
  });
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
    setStatus(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await updateUser(form);
      setStatus({ kind: 'success', text: t('account.profile.saved') });
    } catch (err) {
      setStatus({ kind: 'error', text: err.message });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className={styles.layout} onSubmit={handleSubmit}>
      <FormCard title={t('account.profile.title')}>
        <Input
          name="name"
          placeholder={t('account.profile.name')}
          value={form.name}
          onChange={handleChange}
          required
        />
        <Input
          name="surname"
          placeholder={t('account.profile.surname')}
          value={form.surname}
          onChange={handleChange}
        />
        <Input
          name="birthDate"
          placeholder={t('account.profile.birthDate')}
          value={form.birthDate}
          onChange={handleChange}
        />
        <Input
          type="email"
          name="email"
          placeholder={t('account.profile.email')}
          value={form.email}
          onChange={handleChange}
          required
        />
        <Input
          name="address"
          placeholder={t('account.profile.address')}
          value={form.address}
          onChange={handleChange}
        />
        {status && <p className={styles[status.kind]}>{status.text}</p>}
        <Button type="submit">{t('account.profile.save')}</Button>
      </FormCard>

      <div className={styles.side}>
        <PhotoUpload variant="avatar" />
        <section className={styles.progress}>
          <h2 className={styles.progressTitle}>
            {t('account.profile.progress')}
          </h2>
          <p className={styles.level}>{t('account.profile.level')}</p>
          <div className={styles.bar}>
            <div className={styles.fill} style={{ width: '65%' }}></div>
          </div>
          <ul className={styles.stats}>
            {stats.map((stat) => (
              <li key={stat.id} className={styles.stat}>
                {stat.icon}
                <span>
                  {stat.value} {t(`account.profile.${stat.id}`)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </form>
  );
}

export default ProfileTab;
