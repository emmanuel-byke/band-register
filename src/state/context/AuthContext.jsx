import React, { createContext, useState, useEffect } from 'react';
import { signupAPI, loginAPI, logoutAPI, testConnectionAPI } from '../../api/auth/authAPI';

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshUser, setRefreshUser] = useState(false);

  const signup = async (data) => {
    const response = await signupAPI(data);
    setUser(response.data.user);
    return response;
  };

  const login = async (formData) => {
    const response = await loginAPI(formData);
    setUser(response.data.user);
    return response;
  };

  const logout = async () => {
    const response = await logoutAPI();
    setUser(null);
    return response;
  };

  const testConnection = async () => {
    const response = await testConnectionAPI();
    return response;
  };

  return (
    < AuthContext.Provider value={{ user, loading, refreshUser, signup, login, logout, testConnection }} >
      {children}
    </AuthContext.Provider>
  );
}

