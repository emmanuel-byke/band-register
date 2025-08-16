import axios from 'axios';
import Cookies from "js-cookie";

const BASE_URL = 'http://localhost:8000/';
// const BASE_URL = 'https://band-register-drf.onrender.com/';

const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// CSRF Token management
let csrfToken = '';
let tokenFetchPromise = null;

export const getCSRFToken = async () => {
  // First try to get from cookie
  const cookieToken = Cookies.get("csrftoken");
  if (cookieToken) {
    csrfToken = cookieToken;
    return csrfToken;
  }
  
  // If not in cookie, fetch from server
  if (csrfToken) return csrfToken;
  if (tokenFetchPromise) return tokenFetchPromise;
  
  tokenFetchPromise = apiClient.get('accounts/csrf-token/')
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

// Request interceptor to add both JWT and CSRF tokens
apiClient.interceptors.request.use(
  async (config) => {
    // Add JWT access token from cookie (though our backend reads from cookie directly)
    // This is here for completeness and future flexibility
    const accessToken = Cookies.get('access_token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // Add CSRF token for state-changing operations
    if (['post', 'put', 'patch', 'delete'].includes(config.method?.toLowerCase())) {
      try {
        const csrfToken = await getCSRFToken();
        config.headers["X-CSRFToken"] = csrfToken;
      } catch (error) {
        console.error('Failed to get CSRF token:', error);
        // Continue without CSRF token - let server handle the error
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for JWT refresh and error handling
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Handle JWT token expiration (401 Unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh the access token using refresh token
        const refreshToken = Cookies.get('refresh_token');
        if (refreshToken) {
          const refreshResponse = await apiClient.post('accounts/refresh-token/', {
            refresh: refreshToken
          });
          
          // If refresh successful, retry original request
          if (refreshResponse.status === 200) {
            console.log('Token refreshed successfully');
            return apiClient(originalRequest);
          }
        }
        
        // If no refresh token or refresh failed, redirect to login
        console.warn('Token refresh failed, user needs to login again');
        // Clear any stored tokens
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        
        // You could dispatch a logout action here
        // window.location.href = '/login';
        
      } catch (refreshError) {
        console.error('Token refresh error:', refreshError);
        // Clear tokens and redirect to login
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
      }
    }
    
    // Handle CSRF token issues (403 Forbidden)
    if (error.response?.status === 403 && 
        error.response?.data?.detail?.toLowerCase().includes('csrf')) {
      console.warn('CSRF token invalid, clearing cache');
      csrfToken = '';
      
      // Retry once with new CSRF token
      if (!originalRequest._csrfRetry) {
        originalRequest._csrfRetry = true;
        try {
          await getCSRFToken();
          return apiClient(originalRequest);
        } catch (retryError) {
          console.error('CSRF retry failed:', retryError);
        }
      }
    }
    
    return Promise.reject(error);
  }
);

// Utility function to make authenticated requests with automatic CSRF handling
export const withCSRF = async (apiCall) => {
  try {
    return await apiCall();
  } catch (error) {
    if (error.response?.status === 403 && 
        error.response?.data?.detail?.toLowerCase().includes('csrf')) {
      // Clear CSRF token and retry once
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

export default apiClient;
