import axios from 'axios';
import Cookies from "js-cookie";
import { setupCache } from 'axios-cache-interceptor';

// const BASE_URL = import.meta.env.VITE_API_BASE_URL || 
//                 (import.meta.env.NODE_ENV === 'production' 
//                   ? 'https://band-register-drf.onrender.com/' 
//                   : 'http://localhost:8000/');

const BASE_URL = 'https://band-register-drf.onrender.com/';

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// const apiClient = setupCache(instance);
const apiClient = instance;

let csrfToken = '';
let tokenFetchPromise = null;

export const getCSRFToken = async () => {
  if (csrfToken) return csrfToken;
  if (tokenFetchPromise) return tokenFetchPromise;
  
  tokenFetchPromise = apiClient.get('token/csrftoken/')
    .then(response => { 
      csrfToken = response.data.csrfToken;
      return csrfToken;
    })
    .catch(error => {
      console.error('CSRF token fetch failed:', error);
      throw new Error('CSRF token fetch failed');
    })
    .finally(() => {
      tokenFetchPromise = null;
    });
  return tokenFetchPromise;
};

export const withCSRF = async (apiCall) => {
  try {
    await getCSRFToken();
    return await apiCall();
  } catch (error) {
    if (error.response?.status === 403) {
      // Try to refresh CSRF token and retry once
      csrfToken = '';
      try {
        await getCSRFToken();
        return await apiCall();
      } catch (retryError) {
        throw retryError;
      }
    }
    throw error;
  }
};

apiClient.interceptors.request.use((config) => {
  const csrfToken = Cookies.get("csrftoken");
  if (csrfToken) {
    config.headers["X-CSRFToken"] = csrfToken;
  }
  return config;
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    // Handle CSRF token expiration
    if (error.response?.status === 403 && 
        error.config?.url !== 'token/csrftoken/' &&
        error.response?.data?.detail?.includes('CSRF')) {
      console.warn('CSRF token expired, clearing cache');
      csrfToken = '';
    }
    
    // Handle authentication errors
    if (error.response?.status === 401) {
      console.warn('Authentication failed');
      // Could dispatch a logout action here if you have global state management
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;