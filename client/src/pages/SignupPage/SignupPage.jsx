import { useState } from 'react';
import { useNavigate } from 'react-router';

import AuthLayout from '../../layouts/AuthLayout/AuthLayout';
import AuthCard from '../../components/AuthCard/AuthCard';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import useAuth from '../../hooks/useAuth';
import styles from './SignupPage.module.css';
import googleIcon from '../../assets/google.png';

function SignupPage() {
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
        title="Sign Up"
        imageContent={
          <div>
            <h2 className={styles.imageTitle}>Create your Account</h2>
            <p className={styles.imageText}>
              Exchange a book
              <br />
              Do a good deed
            </p>
          </div>
        }
      >
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <Input
            name="surname"
            placeholder="Surname"
            value={form.surname}
            onChange={handleChange}
          />
          <Input
            name="birthDate"
            placeholder="Date of Birth"
            value={form.birthDate}
            onChange={handleChange}
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          {error && <p className={styles.error}>{error}</p>}
          <Button type="submit">Signup</Button>
          <p className={styles.or}>or</p>
          <Button icon={googleIcon}>Continue with Google</Button>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}

export default SignupPage;
