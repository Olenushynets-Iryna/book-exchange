import { Routes, Route, Navigate } from 'react-router';
import HomePage from './pages/HomePage/HomePage';
import BookPage from './pages/BookPage/BookPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import AccountPage from './pages/AccountPage/AccountPage';
import SettingsSection from './pages/AccountPage/sections/SettingsSection/SettingsSection';
import ProfileTab from './pages/AccountPage/sections/SettingsSection/ProfileTab/ProfileTab';
import SecurityTab from './pages/AccountPage/sections/SettingsSection/SecurityTab/SecurityTab';
import NotificationsTab from './pages/AccountPage/sections/SettingsSection/NotificationsTab/NotificationsTab';
import AnnouncementsSection from './pages/AccountPage/sections/AnnouncementsSection/AnnouncementsSection';
import AnnouncementForm from './pages/AccountPage/sections/AnnouncementsSection/AnnouncementForm/AnnouncementForm';
import OrdersSection from './pages/AccountPage/sections/OrdersSection/OrdersSection';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/books/:id" element={<BookPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route path="/account" element={<AccountPage />}>
        <Route index element={<Navigate to="announcements" replace />} />
        <Route path="settings" element={<SettingsSection />}>
          <Route index element={<Navigate to="profile" replace />} />
          <Route path="profile" element={<ProfileTab />} />
          <Route path="security" element={<SecurityTab />} />
          <Route path="notifications" element={<NotificationsTab />} />
        </Route>
        <Route path="announcements" element={<AnnouncementsSection />} />
        <Route path="announcements/new" element={<AnnouncementForm />} />
        <Route path="orders" element={<OrdersSection />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
