import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/',
  withCredentials: true,
});

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}


api.interceptors.request.use(
  config => {
    // For non-GET requests, add CSRF token if available
    if (config.method !== 'get') {
      const csrfToken = getCookie('csrftoken');
      if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken;
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Prevent retrying for the refresh endpoint itself
    if (
      error.response &&
      error.response.status === 401 &&
      originalRequest.url !== 'accounts/users/me/' &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      
      try {
        // Attempt to refresh by calling the current user endpoint via session
        await api.get('accounts/users/me/');
        // If successful, proceed with the original request
        return api(originalRequest);
      } catch (err) {
        // If refreshing fails, clear the token and reject
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
        return Promise.reject(error);
      }
    }
    
    return Promise.reject(error);
  }
);


export default {
  getActivities: (search) => api.get('activities/', { params: { search } }),
  getActivity: (id) => api.get(`activities/${id}/`),
  createActivity: (activityData) => api.post('activities/', activityData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  updateActivity: (id, activity) => api.patch(`activities/${id}/`, activity),
  deleteActivity: (id) => api.delete(`activities/${id}/`),

  getSchedules: (userId) => api.get(`divisions/user/${userId}/venues/`),
  handleScheduleResponse: (divId, formData) => api.post(`divisions/${divId}/process_venue_response/`, formData),
  // getActivity: (id) => api.get(`activities/${id}/`),
  createScheduleVenue: (divId, formData) => api.post(`divisions/${divId}/create_venue/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  updateVenue: (id, venue) => api.patch(`venues/${id}/`, venue),
  deleteVenue: (id) => api.delete(`venues/${id}/`),
  
  getAllPendingSchedules: (params) => api.get(`pending-requests/venues/`, params),

  getDivisions: (search) => api.get('divisions/', { params: { search } }),
  getDivisionsByUser: (userId, formData) => api.post(`divisions/users/${userId}/all/`, formData),
  getDivisionsDetails: (formData) => api.post(`divisions/get_all_users_divisions_details/`, formData),
  getDivision: (id) => api.get(`divisions/${id}/`),
  createDivision: (divisionData) => api.post('divisions/', divisionData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  updatedivision: (id, division) => api.patch(`divisions/${id}/`, division),
  deletedivision: (id) => api.delete(`divisions/${id}/`),
  divUsers: (divId) => api.get(`divisions/${divId}/get_users/`),
  getAllDivVenues: (searchTerm) => api.get(`venues/with_division/`, { params: { search: searchTerm } }),
  getAllUpcommingDivVenues: (params) => api.get(`venues/upcoming-with-division/`, params),
  // getDivVenues: (divId) => api.get(`divisions/${divId}/get_users/`),
  


  getMonthlyAttendance: (formData) => api.post(`attendances/monthly_attendance/`, formData),


  getFeedbacks: (search) => api.get('feedbacks/', { params: { search } }),
  getFeedback: (id) => api.get(`feedbacks/${id}/`),
  createFeedback: (feedbackyData) => api.post('feedbacks/', feedbackyData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  updateFeedback: (id, feedback) => api.patch(`feedbacks/${id}/`, feedback),
  deleteFeedback: (id) => api.delete(`feedbacks/${id}/`),



  getUsers: (params) => api.get('accounts/public-users/', params),
  getUser: (id) => api.get(`accounts/public-users/${id}/`),
  userAddDiv: (userId, formData) => api.post(`accounts/users/${userId}/add_division/`, formData),
  userRemoveDiv: (userId, formData) => api.post(`accounts/users/${userId}/remove_division/`, formData),
  getTopAttendee: (formData) => api.post(`accounts/users/top_attendance/`, formData),
  changeUserPermissions: (userId, formData) => api.post(`accounts/users/${userId}/permissions/`, formData),
  






  //auth
  login: (credentials) => api.post('accounts/login/', credentials)
    .then(response => {
      // Store token in localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        api.defaults.headers.common['Authorization'] = `Token ${response.data.token}`;
      }
      return response;
    }),
    
  logout: () => api.post('accounts/logout/')
    .then(response => {
      // Remove token from localStorage
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
      return response;
    }),
    
  signup: (userData) => api.post('accounts/signup/', userData)
    .then(response => {
      // Store token in localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        api.defaults.headers.common['Authorization'] = `Token ${response.data.token}`;
      }
      return response;
    }),
    
  getCurrentUser: () => api.get('accounts/users/me/'),
  
  setAuthToken: (token) => {
    if (token) {
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Token ${token}`;
    } else {
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
    }
  },
  
  // Initialize token from localStorage on app load
  initializeAuth: () => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Token ${token}`;
    }
  }
};