import apiClient, { withCSRF } from '../http/axiosClient';

export const getDivisionAPI = async (id) => await apiClient.get(`divisions/${id}/`);
export const getDivisionsAPI = async (search) => await apiClient.get('divisions/', { params: { search } });
export const getDivisionsByUserAPI = async (formData) => await apiClient.get(`divisions/user/stat/`, { params: formData });
export const getDivisionsDetailsAPI = async (formData) => await apiClient.get(`divisions/get_all_users_divisions_details/`, { params: formData });

export const createDivisionAPI = async (formData) => withCSRF(() => apiClient.post('divisions/', formData));
export const updatedivisionAPI = async (id, division) => withCSRF(() => apiClient.patch(`divisions/${id}/`, division));
export const deletedivisionAPI = async (id) => withCSRF(() => apiClient.delete(`divisions/${id}/`));

export const divUsersAPI = async (divId) => await apiClient.get(`divisions/${divId}/get_users/`);
export const getAllDivVenuesAPI = async (searchTerm) => await apiClient.get(`venues/with_division/`, { params: { search: searchTerm } });
export const getAllUpcommingDivVenuesAPI = async (params) => await apiClient.get(`venues/upcoming-with-division/`, params);

export const getDivisionRatingsAPI = async (divId) => withCSRF(() => apiClient.get(`ratings/division_average/`, { params: { divId } }));
export const getUserDivisionRatingsAPI = async (formData) => withCSRF(() => apiClient.get(`ratings/user_div_rating/`, { params: formData }));
export const rateDivisionAPI = async (params) => withCSRF(() => apiClient.post(`ratings/rate_div/`, params));


// getDivVenues: (divId) => api.get(`divisions/${divId}/get_users/`),


  