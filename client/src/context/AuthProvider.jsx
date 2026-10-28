import { useState } from 'react';
import { AuthContext } from './AuthContext';
import { API_URL } from '../services/api';

const STORAGE_KEY = 'user';

function readStoredUser() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);

  function saveUser(newUser) {
    setUser(newUser);
    try {
      if (newUser) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // localStorage недоступний, користувач лишається лише в пам'яті
    }
  }

  function toSafeUser(found) {
    return { id: found.id, name: found.name, email: found.email };
  }

  async function login(email, password) {
    const params = new URLSearchParams({ email, password });
    const response = await fetch(`${API_URL}/users?${params}`);
    if (!response.ok) {
      throw new Error(`Помилка сервера: ${response.status}`);
    }
    const users = await response.json();
    if (users.length === 0) {
      throw new Error('Невірна пошта або пароль');
    }
    saveUser(toSafeUser(users[0]));
  }

  async function register(data) {
    const params = new URLSearchParams({ email: data.email });
    const checkResponse = await fetch(`${API_URL}/users?${params}`);
    if (!checkResponse.ok) {
      throw new Error(`Помилка сервера: ${checkResponse.status}`);
    }
    const existing = await checkResponse.json();
    if (existing.length > 0) {
      throw new Error('Користувач з такою поштою вже існує');
    }

    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Помилка сервера: ${response.status}`);
    }
    const created = await response.json();
    saveUser(toSafeUser(created));
  }

  function logout() {
    saveUser(null);
  }

  const value = {
    user,
    isAuthenticated: user !== null,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
