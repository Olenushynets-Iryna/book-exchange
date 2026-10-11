import Input from '../../../../../components/Input/Input';
import Button from '../../../../../components/Button/Button';
import PhotoUpload from '../PhotoUpload/PhotoUpload';
import styles from './AnnouncementForm.module.css';

function AnnouncementForm({ onDone }) {
  return (
    <div className={styles.form}>
      <section className={styles.card}>
        <h1 className={styles.title}>About the book</h1>
        <div className={styles.fields}>
          <Input placeholder="Name" />
          <Input placeholder="Author" />
          <Input placeholder="Genre" />
          <select className={styles.select} defaultValue="">
            <option value="" disabled>
              Choose fundraiser
            </option>
            <option>Azov</option>
            <option>3 Separate Assault Brigade</option>
            <option>110th Separate Mechanized Brigade</option>
            <option>128th Mountain Assault Brigade</option>
          </select>
          <Input placeholder="Add a plot" />
          <Button onClick={onDone}>Add</Button>
        </div>
      </section>
      <div className={styles.photo}>
        <PhotoUpload />
      </div>
    </div>
  );
}

export default AnnouncementForm;
