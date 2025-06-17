import apiClient, { withCSRF } from '../http/axiosClient';

export const signupAPI = async (data) => withCSRF(() => apiClient.post('accounts/signup/', data));
export const loginAPI = async (formData) => withCSRF(() => apiClient.post('accounts/login/', formData));
export const logoutAPI = async () => withCSRF(() => apiClient.post('accounts/logout/'));
export const testConnectionAPI = async () => await apiClient.get('token/test-connection/');
