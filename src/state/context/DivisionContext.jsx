import React, { createContext, useState, useEffect } from 'react';
import { createDivisionAPI, deletedivisionAPI, divUsersAPI, getAllDivVenuesAPI, getAllUpcommingDivVenuesAPI, 
    getDivisionAPI, getDivisionRatingsAPI, getDivisionsAPI, getDivisionsByUserAPI, getDivisionsDetailsAPI, getUserDivisionRatingsAPI, rateDivisionAPI, updatedivisionAPI 
} from '../../api/endpoints/divisionAPI';



export const DivisionContext = createContext(null);

export default function DivisionProvider({ children }) {

  const getDivision = async (id) => {
    const response = await getDivisionAPI(id);
    return response;
  };
  const getDivisions = async (search) => {
    const response = await getDivisionsAPI(search);
    return response;
  };
  const getDivisionsByUser = async (userId, formData) => {
    const response = await getDivisionsByUserAPI(userId, formData);
    return response;
  };
  const getDivisionsDetails = async (formData) => {
    const response = await getDivisionsDetailsAPI(formData);
    return response;
  };
  const createDivision = async (formData) => {
    const response = await createDivisionAPI(formData);
    return response;
  };
  const updateDivision = async (id, division) => {
    const response = await updatedivisionAPI(id, division);
    return response;
  };
  const deleteDivision = async (id) => {
    const response = await deletedivisionAPI(id);
    return response;
  };
  const divUsers = async (divId) => {
    const response = await divUsersAPI(divId);
    return response;
  };
  const getAllDivVenues = async (searchTerm) => {
    const response = await getAllDivVenuesAPI(searchTerm);
    return response;
  };
  const getAllUpcommingDivVenues = async (params) => {
    const response = await getAllUpcommingDivVenuesAPI(params);
    return response;
  };

  const getDivisionRatings = async (divId) => {
    const response = await getDivisionRatingsAPI(divId);
    return response;
  };
  const getUserDivisionRatings = async () => {
    const response = await getUserDivisionRatingsAPI();
    return response;
  };
  const rateDivision = async (params) => {
    const response = await rateDivisionAPI(params);
    return response;
  };

  
  return (
    < DivisionContext.Provider value={{ getDivision, getDivisions, getDivisionsByUser, getDivisionsDetails,
        createDivision, updateDivision, deleteDivision, divUsers, getAllDivVenues, getAllUpcommingDivVenues, 
        getDivisionRatings, getUserDivisionRatings, rateDivision
     }} >
      {children}
    </DivisionContext.Provider>
  );
}

