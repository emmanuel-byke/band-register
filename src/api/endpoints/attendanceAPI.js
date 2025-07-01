import apiClient, { withCSRF } from '../http/axiosClient';

export const getMonthlyAttendanceAPI = async (formData) => 
    await apiClient.get(`attendances/monthly_attendance/`, formData);
