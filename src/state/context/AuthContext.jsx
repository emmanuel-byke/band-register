import React, { createContext, useState, useEffect } from 'react';
import { signupAPI, loginAPI, logoutAPI, testConnectionAPI } from '../../api/endpoints/authAPI';
import { useUser } from '../hooks/ContextUser';
import apiClient from '../../api/http/axiosClient';

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);

  const { user, setUser } = useUser()

  const signup = async (data) => {
    setLoading(true);
    try{
      const response = await signupAPI(data);
      if (response.data.user) setUser(response.data.user);
      return response;
    } catch(error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (formData) => {
    setLoading(true);
    try{
      // const response = await loginAPI(formData);
      const response = await apiClient.post('accounts/login/', formData);
      if (response.data.user) setUser(response.data.user);
      return response;
    } catch(error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try{
      // const response = await logoutAPI();
      const response = apiClient.post('accounts/logout/');
      return response;
    } catch(error) {
      console.error(error);
      throw error;
    } finally {
      setUser(null);
      setLoading(false);
    }
  };

  const testConnection = async () => {
    const response = await testConnectionAPI();
    return response;
  };

  return (
    < AuthContext.Provider value={{ user, loading, signup, login, logout, testConnection }} >
      {children}
    </AuthContext.Provider>
  );
}

