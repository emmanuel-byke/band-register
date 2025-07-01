import apiClient, { withCSRF } from '../http/axiosClient';

export const getSchedulesAPI = async (userId) => await apiClient.get(`divisions/user/${userId}/venues/`);
export const handleScheduleResponseAPI = async (divId, formData) => 
    withCSRF(() => apiClient.post(`divisions/${divId}/process_venue_response/`, formData));
export const createScheduleVenueAPI = async (divId, formData) => withCSRF(() => apiClient.post(`divisions/${divId}/create_venue/`, formData));
export const updateVenueAPI = async (id, venue) => withCSRF(() => apiClient.patch(`venues/${id}/`, venue));
export const deleteVenueAPI = async (id) => withCSRF(() => apiClient.delete(`venues/${id}/`));
export const getAllPendingSchedulesAPI = async (params) => await apiClient.get(`pending-requests/venues/`, params);


