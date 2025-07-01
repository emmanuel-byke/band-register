import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();
export const AppProvider = ({children}) => {
    const [currentInstr, setCurrentInstr] = useState(() => {
        const savedValue = localStorage.getItem('instruments-data-123-321-123-variable-bykes');
        return savedValue !== null ? JSON.parse(savedValue) : null;
    });
    
    const [renderedInstr, setRenderedInstr] = useState(() => {
        const savedValue = localStorage.getItem('rendered-instrument-data-123-321-123-variable-bykes-Hello_1');
        return savedValue !== null ? JSON.parse(savedValue) : null;
    });

    // const [loggedIn, setLoggedIn] = useState(() => {
    //     const savedValue = localStorage.getItem('logged-in-data-123-321-123-variable-bykes');
    //     return savedValue !== null ? JSON.parse(savedValue) : true;
    // });
    const [loggedIn, setLoggedIn] = useState(true);

    const [userId, setUserId] = useState(() => {
        const savedValue = localStorage.getItem('logged-in-data-id-123-321-123-variable-bykes');
        return savedValue !== null ? JSON.parse(savedValue) : null;
    });

    const [user, setUser] = useState(()=>{
        const savedValue = localStorage.getItem('logged-in-data-id-123-321-123-variable-temp-u-113');
        return savedValue !== null ? JSON.parse(savedValue) : {};
    });

    const [userChanged, setUserChanged] = useState(false);

    useEffect(() => {
        localStorage.setItem('instruments-data-123-321-123-variable-bykes', JSON.stringify(currentInstr));
    }, [currentInstr]);

    useEffect(() => {
        localStorage.setItem('rendered-instrument-data-123-321-123-variable-bykes-Hello_1', JSON.stringify(renderedInstr));
    }, [renderedInstr]);

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

    useEffect(() => {
        localStorage.setItem('logged-in-data-id-123-321-123-variable-temp-u-113', JSON.stringify(user));
    }, [user]);

    return <AppContext.Provider value={{currentInstr, setCurrentInstr, loggedIn, setLoggedIn, userId, setUserId, user, setUser,
        userChanged, setUserChanged, renderedInstr, setRenderedInstr
    }}>
        {children}
    </AppContext.Provider>
}