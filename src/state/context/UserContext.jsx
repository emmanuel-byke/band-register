import React, { createContext, useContext, useState, useEffect } from 'react';
import { changeUserPermissionsAPI, getCurrentUserAPI, getTopAttendeeAPI, getUserAPI, getUsersAPI, 
  updateUserAPI, userAddDivAPI, userRemoveDivAPI } from '../../api/endpoints/usersAPI';

export const UserContext = createContext(null);

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userUpdator, setUserUpdator] = useState(false);

  const fetchUser = async () => {
    try {
      const response = await getCurrentUserAPI();
      return response;
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    async function initializeUser() {
      setLoading(true);
      try {
        const response = await fetchUser();
        setUser(response.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    initializeUser();
  }, [userUpdator]);

  const refreshUser = () => {
    setUserUpdator(!userUpdator);
  }

  
  const updateUser = async (id, formData) => {
    await updateUserAPI(id, formData);
    refreshUser();
  };

  const getUser = async (id) => {
    const response = await getUserAPI(id);
    return response;
  };

  const getUsers = async (config) => {
    const response = await getUsersAPI(config);
    return response;
  };

  const userAddDiv = async (userID, formData) => {
    const response = await userAddDivAPI(userID, formData);
    return response;
  };
  const userRemoveDiv = async (userID, formData) => {
    const response = await userRemoveDivAPI(userID, formData);
    return response;
  };
  const getTopAttendee = async (formData) => {
    const response = await getTopAttendeeAPI(formData);
    return response;
  };
  const changeUserPermissions = async (userID, formData) => {
    const response = await changeUserPermissionsAPI(userID, formData);
    return response;
  };

  
  return (
    <UserContext.Provider
        value={{ user, userUpdator, setUser, loading, refreshUser, updateUser, getUsers, getUser, 
          userAddDiv, userRemoveDiv, getTopAttendee,changeUserPermissions, fetchUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

