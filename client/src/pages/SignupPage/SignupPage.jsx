import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

import AuthLayout from '../../layouts/AuthLayout/AuthLayout';
import AuthCard from '../../components/AuthCard/AuthCard';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import useAuth from '../../hooks/useAuth';
import styles from './SignupPage.module.css';
import googleIcon from '../../assets/google.png';

function SignupPage() {
  const { t } = useTranslation();
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    surname: '',
    birthDate: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (isSubmitting) return;
    setError(null);
    setIsSubmitting(true);
    try {
      await register(form);
      navigate('/account');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthLayout>
      <AuthCard
        title={t('auth.signup.title')}
        imageContent={
          <div>
            <h2 className={styles.imageTitle}>{t('auth.signup.imageTitle')}</h2>
            <p className={styles.imageText}>
              {t('auth.signup.imageLine1')}
              <br />
              {t('auth.signup.imageLine2')}
            </p>
          </div>
        }
      >
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            name="name"
            placeholder={t('auth.signup.name')}
            value={form.name}
            onChange={handleChange}
            required
          />
          <Input
            name="surname"
            placeholder={t('auth.signup.surname')}
            value={form.surname}
            onChange={handleChange}
          />
          <Input
            name="birthDate"
            placeholder={t('auth.signup.birthDate')}
            value={form.birthDate}
            onChange={handleChange}
          />
          <Input
            type="email"
            name="email"
            placeholder={t('auth.email')}
            value={form.email}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder={t('auth.password')}
            value={form.password}
            onChange={handleChange}
            required
          />
          {error && <p className={styles.error}>{error}</p>}
          <Button type="submit">{t('auth.signup.submit')}</Button>
          <p className={styles.or}>{t('auth.login.or')}</p>
          <Button icon={googleIcon}>{t('auth.login.google')}</Button>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}

export default SignupPage;
