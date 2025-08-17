import React, { createContext, useState, useEffect } from 'react';
import { createFeedbackAPI, deleteFeedbackAPI, feedbackRenderAPI, getFeedbackAPI, getFeedbacksAPI, 
    updateFeedbackAPI } from '../../api/endpoints/feedbackAPI';

export const FeedbackContext = createContext(null);

export default function FeedbackProvider({ children }) {

  const getFeedback = async (id) => {
    const response = await getFeedbackAPI(id);
    return response;
  };
  const getFeedbacks = async (search) => {
    const response = await getFeedbacksAPI(search);
    return response;
  };
  const createFeedback = async (formData) => {
    const response = await createFeedbackAPI(formData);
    return response;
  };
  const updateFeedback = async (id, feedback) => {
    const response = await updateFeedbackAPI(id, feedback);
    return response;
  };
  const deleteFeedback = async (id) => {
    const response = await deleteFeedbackAPI(id);
    return response;
  };

  const getFeedbackRender = async (userId) => {
    const response = await feedbackRenderAPI(userId);
    return response;
  };

  
  return (
    < FeedbackContext.Provider value={{ getFeedback, getFeedbacks, createFeedback, updateFeedback, deleteFeedback, getFeedbackRender }} >
      {children}
    </FeedbackContext.Provider>
  );
}

