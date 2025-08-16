import React, { createContext, useState, useEffect } from 'react';
import { createScheduleVenueAPI, deleteVenueAPI, getAllPendingSchedulesAPI, getSchedulesAPI, handleScheduleResponseAPI, updateVenueAPI } from '../../api/endpoints/scheduleAPI';


export const ScheduleContext = createContext(null);

export default function ScheduleProvider({ children }) {

  const getSchedules = async (userId) => {
    const response = await getSchedulesAPI(userId);
    return response;
  };
  const handleScheduleResponse = async (divId, formData) => {
    const response = await handleScheduleResponseAPI(divId, formData);
    return response;
  };
  const createScheduleVenue = async (divId, formData) => {
    const response = await createScheduleVenueAPI(divId, formData);
    return response;
  };
  const updateVenue = async (divId, venue) => {
    const response = await updateVenueAPI(divId, venue);
    return response;
  };
  const deleteVenue = async (id) => {
    const response = await deleteVenueAPI(id);
    return response;
  };
  const getAllPendingSchedules = async (params) => {
    const response = await getAllPendingSchedulesAPI(params);
    return response;
  };

  
  return (
    < ScheduleContext.Provider value={{ getSchedules,handleScheduleResponse, createScheduleVenue, updateVenue, 
        deleteVenue, getAllPendingSchedules
     }} >
      {children}
    </ScheduleContext.Provider>
  );
}

