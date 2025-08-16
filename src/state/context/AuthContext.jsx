import { createContext, useState } from 'react';
import apiClient from '../../api/http/axiosClient';
import { useUser } from '../hooks/ContextUser';

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);

  const { user, setUser, refreshUser } = useUser()

  const signup = async (data) => {
    setLoading(true);
    try{
      const response = await apiClient.post('accounts/signup/', data);
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
      const response = await apiClient.post('accounts/logout/');
      await refreshUser();
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
    const response = await apiClient.get('token/test-connection/');
    return response;
  };

  return (
    < AuthContext.Provider value={{ user, loading, signup, login, logout, testConnection }} >
      {children}
    </AuthContext.Provider>
  );
}

