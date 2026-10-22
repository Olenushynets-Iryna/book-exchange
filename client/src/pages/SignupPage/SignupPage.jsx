import AuthLayout from '../../layouts/AuthLayout/AuthLayout';
import AuthCard from '../../components/AuthCard/AuthCard';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import styles from './SignupPage.module.css';
import googleIcon from '../../assets/google.png';

function SignupPage() {
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
        <form className={styles.form}>
          <Input placeholder="Name" />
          <Input placeholder="Surname" />
          <Input placeholder="Date of Birth" />
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Button>Signup</Button>
          <p className={styles.or}>or</p>
          <Button icon={googleIcon}>Continue with Google</Button>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}

export default SignupPage;
