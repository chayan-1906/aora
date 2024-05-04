import {createContext, useContext, useEffect, useState} from 'react';
import {getCurrentUser} from "../lib/appwrite";

const GlobalContext = createContext();

const GlobalProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getCurrentUser().then((response) => {
            if (response) {
                setIsLoggedIn(true);
                setUser(response);
            } else {
                setIsLoggedIn(false);
                setUser(null);
            }
        }).catch((error) => {
            console.error('inside catch of GlobalProvider\'s useEffect', error);
        }).finally(() => {
            setIsLoading(false);
        });
    }, []);

    return (
        <GlobalContext.Provider value={{
            isLoggedIn,
            setIsLoggedIn,
            user,
            setUser,
            isLoading,
        }}>{children}</GlobalContext.Provider>
    );
}

export const useGlobalContext = () => useContext(GlobalContext);

export default GlobalProvider;