import { useState } from 'react';
import { useNavigate } from 'react-router';
import Input from '../../../../../components/Input/Input';
import Button from '../../../../../components/Button/Button';
import PhotoUpload from '../PhotoUpload/PhotoUpload';
import useCreateAnnouncement from '../../../../../hooks/useCreateAnnouncement';
import styles from './AnnouncementForm.module.css';

function AnnouncementForm() {
  const navigate = useNavigate();
  const { create, isSubmitting, error } = useCreateAnnouncement();
  const [form, setForm] = useState({
    title: '',
    author: '',
    genre: '',
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
        <h1 className={styles.title}>About the book</h1>
        <div className={styles.fields}>
          <Input
            name="title"
            placeholder="Name"
            value={form.title}
            onChange={handleChange}
            required
          />
          <Input
            name="author"
            placeholder="Author"
            value={form.author}
            onChange={handleChange}
            required
          />
          <Input
            name="genre"
            placeholder="Genre"
            value={form.genre}
            onChange={handleChange}
          />
          <select
            className={styles.select}
            name="fundraiser"
            value={form.fundraiser}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Choose fundraiser
            </option>
            <option>Azov</option>
            <option>3 Separate Assault Brigade</option>
            <option>110th Separate Mechanized Brigade</option>
            <option>128th Mountain Assault Brigade</option>
          </select>
          <Input
            name="plot"
            placeholder="Add a plot"
            value={form.plot}
            onChange={handleChange}
          />
          {error && <p className={styles.error}>{error}</p>}
          <Button type="submit">Add</Button>
        </div>
      </section>
      <div className={styles.photo}>
        <PhotoUpload />
      </div>
    </form>
  );
}

export default AnnouncementForm;
