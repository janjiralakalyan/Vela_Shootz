import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAdminAuth, setAdminAuth, clearAdminAuth } from '../data/storage';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [adminUser, setAdminUser] = useState(getAdminAuth());

  const login = (email, password) => {
    // Standard secure credentials for Vela Shootz Administrator
    if (email.trim().toLowerCase() === 'admin@velashootz.com' && password === 'vela2026') {
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
      return { success: false, message: 'Invalid credentials. Use admin@velashootz.com / vela2026' };
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
