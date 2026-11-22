import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import Input from '../../../../../components/Input/Input';
import Button from '../../../../../components/Button/Button';
import PhotoUpload from '../PhotoUpload/PhotoUpload';
import useCreateAnnouncement from '../../../../../hooks/useCreateAnnouncement';
import { genres, fundraisers } from '../../../../../constants/options';
import styles from './AnnouncementForm.module.css';

function AnnouncementForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { create, isSubmitting, error } = useCreateAnnouncement();
  const [form, setForm] = useState({
    title: '',
    author: '',
    genre: '',
    price: '',
    fundraiser: '',
    plot: '',
  });

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (isSubmitting) return;
    const created = await create(form);
    if (created) {
      navigate('/account/announcements');
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <section className={styles.card}>
        <h1 className={styles.title}>{t('account.form.title')}</h1>
        <div className={styles.fields}>
          <Input
            name="title"
            placeholder={t('account.form.name')}
            value={form.title}
            onChange={handleChange}
            required
          />
          <Input
            name="author"
            placeholder={t('account.form.author')}
            value={form.author}
            onChange={handleChange}
            required
          />
          <select
            className={styles.select}
            name="genre"
            value={form.genre}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              {t('account.form.genre')}
            </option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {t(`genres.${genre}`)}
              </option>
            ))}
          </select>
          <Input
            type="number"
            name="price"
            min="1"
            placeholder={t('account.form.price')}
            value={form.price}
            onChange={handleChange}
            required
          />
          <select
            className={styles.select}
            name="fundraiser"
            value={form.fundraiser}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              {t('account.form.chooseFundraiser')}
            </option>
            {fundraisers.map((fund) => (
              <option key={fund} value={fund}>
                {t(`fundraisers.${fund}`)}
              </option>
            ))}
          </select>
          <Input
            name="plot"
            placeholder={t('account.form.plot')}
            value={form.plot}
            onChange={handleChange}
          />
          {error && <p className={styles.error}>{error}</p>}
          <Button type="submit">{t('account.form.add')}</Button>
        </div>
      </section>
      <div className={styles.photo}>
        <PhotoUpload />
      </div>
    </form>
  );
}

export default AnnouncementForm;
