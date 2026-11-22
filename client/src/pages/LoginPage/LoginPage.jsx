import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

import AuthLayout from '../../layouts/AuthLayout/AuthLayout';
import AuthCard from '../../components/AuthCard/AuthCard';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import useAuth from '../../hooks/useAuth';
import googleIcon from '../../assets/google.png';
import styles from './LoginPage.module.css';

function LoginPage() {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (isSubmitting) return;
    setError(null);
    setIsSubmitting(true);
    try {
      await login(email, password);
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
        title={t('auth.login.title')}
        imageContent={<p className={styles.slogan}>{t('auth.login.slogan')}</p>}
      >
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder={t('auth.email')}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <Input
            type="password"
            placeholder={t('auth.password')}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <a className={styles.forgot} href="#">
            {t('auth.login.forgot')}
          </a>
          {error && <p className={styles.error}>{error}</p>}
          <Button type="submit">{t('auth.login.submit')}</Button>
          <p className={styles.or}>{t('auth.login.or')}</p>
          <Button icon={googleIcon}>{t('auth.login.google')}</Button>
        </form>
        <p className={styles.signup}>
          {t('auth.login.notMember')}{' '}
          <Link className={styles.signupLink} to="/signup">
            {t('auth.login.signupLink')}
          </Link>
        </p>
      </AuthCard>
    </AuthLayout>
  );
}

export default LoginPage;
