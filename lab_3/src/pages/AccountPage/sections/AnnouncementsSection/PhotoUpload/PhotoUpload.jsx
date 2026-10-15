import { useState } from 'react';
import styles from './PhotoUpload.module.css';

const icons = {
  book: (
    <>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </>
  ),
  avatar: (
    <>
      <circle cx="12" cy="12" r="11" />
      <circle cx="12" cy="10" r="3.5" />
      <path d="M5 19c1.5-3.5 4-5 7-5s5.5 1.5 7 5" />
    </>
  ),
};

function PhotoUpload({ variant = 'book' }) {
  const [preview, setPreview] = useState(null);

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <label className={styles.card}>
      <input
        className={styles.input}
        type="file"
        accept="image/*"
        onChange={handleChange}
      />
      {preview ? (
        <img className={styles.preview} src={preview} alt="Preview" />
      ) : (
        <svg
          className={styles.icon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {icons[variant]}
        </svg>
      )}
      <span className={styles.text}>Add a photo</span>
    </label>
  );
}

export default PhotoUpload;
