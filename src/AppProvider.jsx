import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();
export const AppProvider = ({children}) => {
    const [currentInstr, setCurrentInstr] = useState(() => {
        const savedValue = localStorage.getItem('instruments-data-123-321-123-variable-bykes');
        return savedValue !== null ? JSON.parse(savedValue) : null;
    });

    const [loggedIn, setLoggedIn] = useState(() => {
        const savedValue = localStorage.getItem('logged-in-data-123-321-123-variable-bykes');
        return savedValue !== null ? JSON.parse(savedValue) : false;
    });

    const [userId, setUserId] = useState(() => {
        const savedValue = localStorage.getItem('logged-in-data-id-123-321-123-variable-bykes');
        return savedValue !== null ? JSON.parse(savedValue) : null;
    });

    const [user, setUser] = useState({});

    useEffect(() => {
        localStorage.setItem('instruments-data-123-321-123-variable-bykes', JSON.stringify(currentInstr));
    }, [currentInstr]);

    useEffect(() => {
        localStorage.setItem('logged-in-data-123-321-123-variable-bykes', JSON.stringify(loggedIn));
        if(!loggedIn) {
            setUserId(null);
            setUser({});
            setCurrentInstr(null);
        }
    }, [loggedIn]);

    useEffect(() => {
        localStorage.setItem('logged-in-data-id-123-321-123-variable-bykes', JSON.stringify(userId));
    }, [userId]);

    return <AppContext.Provider value={{currentInstr, setCurrentInstr, loggedIn, setLoggedIn, userId, setUserId, user, setUser}}>
        {children}
    </AppContext.Provider>
}