import { Outlet } from 'react-router';
import AccountSidebar from './AccountSidebar/AccountSidebar';
import Footer from '../../components/Footer/Footer';
import styles from './AccountPage.module.css';

function AccountPage() {
  return (
    <div className={styles.page}>
      <div className={styles.body}>
        <AccountSidebar />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default AccountPage;
