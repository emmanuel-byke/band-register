import React, { createContext, useState, useEffect } from 'react';
import { createActivityAPI, deleteActivityAPI, getActivitiesAPI, getActivityAPI, updateActivityAPI } from '../../api/endpoints/activityAPI';


export const ActivityContext = createContext(null);

export default function ActivityProvider({ children }) {

  const getActivity = async (id) => {
    const response = await getActivityAPI(id);
    return response;
  };
  const getActivities = async (search) => {
    const response = await getActivitiesAPI(search);
    return response;
  };
  const createActivity = async (formData) => {
    const response = await createActivityAPI(formData);
    return response;
  };
  const updateActivity = async (formData) => {
    const response = await updateActivityAPI(formData);
    return response;
  };
  const deleteActivity = async (id) => {
    const response = await deleteActivityAPI(id);
    return response;
  };

  
  return (
    < ActivityContext.Provider value={{ getActivity, getActivities, createActivity, updateActivity, deleteActivity }} >
      {children}
    </ActivityContext.Provider>
  );
}

