import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAdminAuth, setAdminAuth, clearAdminAuth } from '../data/storage';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [adminUser, setAdminUser] = useState(getAdminAuth());

  const login = (email, password) => {
    // Standard secure credentials for Vela Shootz Administrator
    const ADMIN_USER = import.meta.env.VITE_ADMIN_USERNAME;
    const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASSWORD;
    if (email.trim().toLowerCase() === ADMIN_USER?.toLowerCase() && password === ADMIN_PASS) {
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
      return { success: false, message: 'Invalid credentials. Check environment variables.' };
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
