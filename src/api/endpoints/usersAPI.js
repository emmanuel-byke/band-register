import apiClient, { withCSRF } from '../http/axiosClient';

export const getCurrentUserAPI = async () => await apiClient.get(`accounts/users/me/`);
export const updateUserAPI = async (userId, formData) => withCSRF(() => apiClient.patch(`accounts/users/${userId}/`, formData));
export const getUsersAPI = async (params) => await apiClient.get('accounts/public-users/', params);
export const getUserAPI = async (id) => await apiClient.get(`accounts/public-users/${id}/`, id);
export const userAddDivAPI = async (userId, formData) => withCSRF(() => apiClient.post(`accounts/users/${userId}/add_division/`, formData));
export const userRemoveDivAPI = async (userId, formData) => withCSRF(() => apiClient.post(`accounts/users/${userId}/remove_division/`, formData));
export const getTopAttendeeAPI = async (formData) => await apiClient.get(`accounts/users/top_attendance/`, formData);
export const changeUserPermissionsAPI = async (userId, formData) => withCSRF(() => apiClient.post(`accounts/users/${userId}/permissions/`, formData));


// export const getAllUserDivAPI = async (id) => await apiClient.get(`accounts/public-users/${id}/`, id);
// export const getUserDivAPI = async (id) => await apiClient.get(`accounts/public-users/${id}/`, id);
