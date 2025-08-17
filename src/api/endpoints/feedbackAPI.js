import apiClient, { withCSRF } from '../http/axiosClient';

export const getFeedbackAPI = async (id) => await apiClient.get(`feedbacks/${id}/`);
export const getFeedbacksAPI = async (search) => await apiClient.get('feedbacks/', { params: { search } });
export const createFeedbackAPI = async (formData) => withCSRF(() => apiClient.post('feedbacks/', formData));
export const updateFeedbackAPI = async (id, feedback) => withCSRF(() => apiClient.patch(`feedbacks/${id}/`, feedback));
export const deleteFeedbackAPI = async (id) => withCSRF(() => apiClient.delete(`feedbacks/${id}/`));

export const feedbackRenderAPI = async (userId) => withCSRF(() => apiClient.get(`feedbacks/render/`, { params: { userId } }));

