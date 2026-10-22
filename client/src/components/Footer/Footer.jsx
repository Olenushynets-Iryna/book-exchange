import Logo from '../Logo/Logo';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Logo />
          <p className={styles.slogan}>Exchange a book. Do a good deed.</p>
        </div>

        <div className={styles.column}>
          <h3 className={styles.heading}>Contacts</h3>
          <a className={styles.link} href="mailto:hello@bookexchange.example">
            hello@bookexchange.example
          </a>
        </div>

        <div className={styles.column}>
          <h3 className={styles.heading}>Follow us</h3>
          <a
            className={styles.link}
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
          <a
            className={styles.link}
            href="https://www.facebook.com/"
            target="_blank"
            rel="noreferrer"
          >
            Facebook
          </a>
        </div>

        <div className={styles.column}>
          <h3 className={styles.heading}>Information</h3>
          <a className={styles.link} href="#">
            How it works
          </a>
          <a className={styles.link} href="#">
            Privacy policy
          </a>
          <a className={styles.link} href="#">
            Terms of use
          </a>
        </div>
      </div>
      <p className={styles.copy}>
        © 2026 Book Exchange for Charity. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
