import { AppContext } from '../AppProvider';
import { useState, useEffect, useContext } from 'react';
import api from './api';


export default function useAuth() {
  const [loading, setLoading] = useState(true);
  const { setLoggedIn, setUserId, setUser, userChanged, setUserChanged } = useContext(AppContext);

  const auth = (user) => {
    setLoggedIn(!!user);
    setUserId(user?.id??null);
    setUser(user??null);
    return user;
  };
  

  useEffect(() => {
    api.getCurrentUser()
      .then(response => {
        auth(response.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        auth(null);
      });
  }, [userChanged]);

  const refreshUser = () => {
    auth(null);
    setLoading(true);
    setUserChanged(prev=>!prev);
  }

  return { refreshUser, loading };
}

