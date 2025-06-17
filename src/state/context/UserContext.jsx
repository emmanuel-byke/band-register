import React, { createContext, useContext, useState, useEffect } from 'react';
import { changeUserPermissionsAPI, getCurrentUserAPI, getUserAPI, getUsersAPI, updateUserAPI, userAddDivAPI, userRemoveDivAPI } from '../../api/Users/usersAPI';

export const UserContext = createContext(null);

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshUser, setRefreshUser] = useState(false);

  useEffect(() => {
    async function initializeUser() {
      setLoading(true);
      try {
        const response = await getCurrentUserAPI();
        setUser(response.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    initializeUser();
  }, [refreshUser]);

  
  const updateUser = async (id, formData) => {
    await updateUserAPI(id, formData);
    setRefreshUser((prev) => !prev);

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
    // const response = await getTopAttendeeAPI(formData);
    // return response;
  };
  const changeUserPermissions = async (userID, formData) => {
    const response = await changeUserPermissionsAPI(userID, formData);
    return response;
  };

  
  return (
    <UserContext.Provider
        value={{ user, loading, refreshUser, updateUser, getUsers, getUser, userAddDiv, userRemoveDiv, getTopAttendee,changeUserPermissions
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

