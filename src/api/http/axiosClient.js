import axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 
                (import.meta.env.NODE_ENV === 'production' 
                  ? 'https://band-register-drf.onrender.com/' 
                  : 'http://localhost:8000/');

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
});

// const apiClient = setupCache(instance);
const apiClient = instance;

let csrfToken = '';
let tokenFetchPromise = null;

export const getCSRFToken = async () => {
  if (csrfToken) return csrfToken;
  if (tokenFetchPromise) return tokenFetchPromise;
  
  tokenFetchPromise = apiClient.get('token/csrftoken/', { cache: false })
    .then(response => { 
        csrfToken = response.data.csrfToken;
        return csrfToken;
    })
    .catch(error => {
      throw new Error('CSRF token fetch failed', { cause: error });
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
    throw new Error("Auth operation failed", { cause: error });
  }
};

apiClient.interceptors.request.use(async (config) => {
  const mutatingMethods = ['post', 'put', 'patch', 'delete'];
  
  if (mutatingMethods.includes(config.method.toLowerCase())) {
    try {
      const token = await getCSRFToken();
      config.headers['X-CSRFToken'] = token;
    } catch (error) {
      console.error('CSRF token injection failed:', error);
      throw new Error('Request preparation failed', { cause: error });
    }
  }
  return config;
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 403 && error.config.url !== 'token/csrftoken/') {
      console.warn('CSRF token possibly expired, resetting token');
      csrfToken = '';  // Force token refresh on next request
    }
    return Promise.reject(error);
  }
);

export default apiClient;