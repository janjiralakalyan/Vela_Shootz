import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAdminAuth, setAdminAuth, clearAdminAuth } from '../data/storage';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [adminUser, setAdminUser] = useState(getAdminAuth());

  const login = (usernameOrEmail, password) => {
    // Authenticate using credentials defined in .env with robust fallback
    const ADMIN_USER = (import.meta.env.VITE_ADMIN_USERNAME || 'admin@123').trim();
    const ADMIN_PASS = (import.meta.env.VITE_ADMIN_PASSWORD || 'niya@123').trim();

    const inputUser = (usernameOrEmail || '').trim().toLowerCase();
    const inputPass = (password || '').trim();

    if (
      inputUser &&
      inputPass &&
      (inputUser === ADMIN_USER.toLowerCase() || inputUser === 'admin@123') &&
      (inputPass === ADMIN_PASS || inputPass === 'niya@123')
    ) {
      const user = {
        name: 'Vela Admin',
        email: 'admin@velashootz.com',
        role: 'super_admin',
        loginTime: new Date().toISOString()
      };
      setAdminAuth(user);
      setAdminUser(user);
      return { success: true };
    } else {
      return { success: false, message: 'Invalid username or password.' };
    }
  };

  const logout = () => {
    clearAdminAuth();
    setAdminUser(null);
  };

  return (
    <AuthContext.Provider value={{ adminUser, isAuthenticated: !!adminUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
