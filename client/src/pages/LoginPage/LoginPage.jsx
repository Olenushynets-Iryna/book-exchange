import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

import AuthLayout from '../../layouts/AuthLayout/AuthLayout';
import AuthCard from '../../components/AuthCard/AuthCard';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import useAuth from '../../hooks/useAuth';
import googleIcon from '../../assets/google.png';
import styles from './LoginPage.module.css';

function LoginPage() {
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
        title="Login"
        imageContent={
          <p className={styles.slogan}>Giving is the greatest act of grace.</p>
        }
      >
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <a className={styles.forgot} href="#">
            Forget password ?
          </a>
          {error && <p className={styles.error}>{error}</p>}
          <Button type="submit">Login</Button>
          <p className={styles.or}>or</p>
          <Button icon={googleIcon}>Continue with Google</Button>
        </form>
        <p className={styles.signup}>
          Not a Member?{' '}
          <Link className={styles.signupLink} to="/signup">
            Signup
          </Link>
        </p>
      </AuthCard>
    </AuthLayout>
  );
}

export default LoginPage;
