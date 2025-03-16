import { AppContext } from '../AppProvider';
import { useState, useEffect, useContext } from 'react';
import api from './api';


export default function useUser() {
  const [user, _setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setLoggedIn, setUserId, setUser } = useContext(AppContext);


  const createDivision = async (formData) => {
    try {
        const response = await api.createDivision(formData);
        return response.data;
    } catch (error) {
      return null;
    }
  };


  return { createDivision };
}

