import apiClient, { withCSRF } from '../http/axiosClient';

export const getDivisionAPI = async (id) => await apiClient.get(`divisions/${id}/`);
export const getDivisionsAPI = async (search) => await apiClient.get('divisions/', { params: { search } });
export const getDivisionsByUserAPI = async (userId, formData) => await apiClient.get(`divisions/users/${userId}/all/`, formData);
export const getDivisionsDetailsAPI = async (formData) => await apiClient.get(`divisions/get_all_users_divisions_details/`, formData);

export const createDivisionAPI = async (formData) => withCSRF(() => apiClient.post('divisions/', formData));
export const updatedivisionAPI = async (id, division) => withCSRF(() => apiClient.patch(`divisions/${id}/`, division));
export const deletedivisionAPI = async (id) => withCSRF(() => apiClient.delete(`divisions/${id}/`));

export const divUsersAPI = async (divId) => await apiClient.get(`divisions/${divId}/get_users/`);
export const getAllDivVenuesAPI = async (searchTerm) => await apiClient.get(`venues/with_division/`, { params: { search: searchTerm } });
export const getAllUpcommingDivVenuesAPI = async (params) => await apiClient.get(`venues/upcoming-with-division/`, params);


// getDivVenues: (divId) => api.get(`divisions/${divId}/get_users/`),


  