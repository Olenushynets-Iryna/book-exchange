import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth потрібно використовувати всередині AuthProvider');
  }
  return context;
}

export default useAuth;
