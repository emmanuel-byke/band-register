import api from './api';

// Initialize authentication on app load
export const initAuth = () => {
  api.initializeAuth();
  
  // Return a promise that resolves with the current user or rejects if not authenticated
  return new Promise((resolve, reject) => {
    api.getCurrentUser()
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        // Clear any invalid tokens
        api.setAuthToken(null);
        reject(error);
      });
  });
};

// Check if user is authenticated
export const isAuthenticated = async () => {
  try {
    await api.getCurrentUser();
    return true;
  } catch (error) {
    return false;
  }
};

// Login helper
export const login = async (credentials) => {
  const response = await api.login(credentials);
  return response.data.user;
};

// Signup helper
export const signup = async (userData) => {
  const response = await api.signup(userData);
  return response.data.user;
};

// Logout helper
export const logout = async () => {
  await api.logout();
};

export default {
  initAuth,
  isAuthenticated,
  login,
  signup,
  logout
};