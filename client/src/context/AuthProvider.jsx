import { useEffect, useState } from 'react';
import i18n from '../i18n';
import { AuthContext } from './AuthContext';
import { API_URL, serverError } from '../services/api';

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/me`, { credentials: 'include' })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => setUser(data))
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, []);

  async function login(email, password) {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });

    if (response.status === 401) {
      throw new Error(i18n.t('errors.invalidCredentials'));
    }
    if (!response.ok) {
      throw serverError(response.status);
    }

    setUser(await response.json());
  }

  const loginWithGoogle = async (accessToken) => {
    const res = await fetch(`${API_URL}/auth/google`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accessToken }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Server error');
    setUser(data);
  };

  async function register(data) {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (response.status === 409) {
      throw new Error(i18n.t('errors.emailTaken'));
    }
    if (response.status === 400) {
      throw new Error(i18n.t('errors.invalidData'));
    }
    if (!response.ok) {
      throw serverError(response.status);
    }

    await login(data.email, data.password);
  }

  async function logout() {
    try {
      await fetch(`${API_URL}/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } finally {
      setUser(null);
    }
  }

  async function updateUser(changes) {
    const response = await fetch(`${API_URL}/me`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(changes),
    });

    if (response.status === 409) {
      throw new Error(i18n.t('errors.emailInUse'));
    }
    if (response.status === 400) {
      throw new Error(i18n.t('errors.invalidData'));
    }
    if (!response.ok) {
      throw serverError(response.status);
    }

    setUser(await response.json());
  }

  const updateNotifications = async (settings) => {
    const res = await fetch(`${API_URL}/me/notifications`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Server error');
    setUser(data);
  };

  async function uploadAvatar(file) {
    const body = new FormData();
    body.append('avatar', file);

    const response = await fetch(`${API_URL}/me/avatar`, {
      method: 'POST',
      credentials: 'include',
      body,
    });

    if (response.status === 413) {
      throw new Error(i18n.t('errors.fileTooLarge'));
    }
    if (!response.ok) {
      throw serverError(response.status);
    }

    setUser(await response.json());
  }

  const value = {
    user,
    isLoading,
    isAuthenticated: user !== null,
    login,
    register,
    logout,
    updateUser,
    uploadAvatar,
    updateNotifications,
    loginWithGoogle,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
