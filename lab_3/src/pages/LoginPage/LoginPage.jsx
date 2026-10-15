import AuthLayout from '../../layouts/AuthLayout/AuthLayout';
import AuthCard from '../../components/AuthCard/AuthCard';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import googleIcon from '../../assets/google.png';
import styles from './LoginPage.module.css';

function LoginPage() {
  return (
    <AuthLayout>
      <AuthCard
        title="Login"
        imageContent={
          <p className={styles.slogan}>Giving is the greatest act of grace.</p>
        }
      >
        <form className={styles.form}>
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <a className={styles.forgot} href="#">
            Forget password ?
          </a>
          <Button>Login</Button>
          <p className={styles.or}>or</p>
          <Button icon={googleIcon}>Continue with Google</Button>
        </form>
        <p className={styles.signup}>
          Not a Member?{' '}
          <a className={styles.signupLink} href="#">
            Signup
          </a>
        </p>
      </AuthCard>
    </AuthLayout>
  );
}

export default LoginPage;
