import React, { createContext, useState, useEffect } from 'react';
import { getMonthlyAttendanceAPI } from '../../api/endpoints/attendanceAPI';



export const AttendanceContext = createContext(null);

export default function AttendanceProvider({ children }) {

  const getMonthlyAttendance = async (formData) => {
    const response = await getMonthlyAttendanceAPI(formData);
    return response;
  };

  
  return (
    < AttendanceContext.Provider value={{ getMonthlyAttendance }} >
      {children}
    </AttendanceContext.Provider>
  );
}

