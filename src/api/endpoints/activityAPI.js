import apiClient, { withCSRF } from '../http/axiosClient';

export const getActivityAPI = async (id) => await apiClient.get(`activities/${id}/`);
export const getActivitiesAPI = async (search) => await apiClient.get('activities/', { params: { search } });
export const createActivityAPI = async (formData) => withCSRF(() => apiClient.post('activities/', formData));
export const updateActivityAPI = async (id, activity) => withCSRF(() => apiClient.patch(`activities/${id}/`, activity));
export const deleteActivityAPI = async (id) => withCSRF(() => apiClient.delete(`activities/${id}/`));
