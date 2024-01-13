import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { get } from '../services/authService';

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    const getUser = () => {
        return localStorage.getItem('user');
    }

    const storeToken = (token) => {
        // Upon login, store the token in localStorage
        localStorage.setItem('authToken', token);
    };

    const removeToken = () => {
        // Upon logout, remove the token from the localStorage
        localStorage.removeItem('authToken');
    };

    const getToken = () => {
        return localStorage.getItem('authToken');
    };

    const authenticateUser = () => {
        // Get the stored token from the localStorage
        const storedToken = localStorage.getItem('authToken');

        // If the token exists in the localStorage
        if(storedToken) {
            // We must send the JWT token in the request's "Authorization" Headers
            get('/auth/verify')
                .then((response) => {
                    // If the server verifies that the JWT token is valid
                    const user = response.data;

                    console.log('Authenticate User/Decode Token ===> ', user);

                    // Update state variables
                    setIsLoading(false);
                    setUser(user);

                    localStorage.setItem('user', response.data._id);
                })
                .catch((error) => {
                    // If the server sends an error response (invalid token)
                    // Update state variables
                    removeToken();
                    setIsLoading(false);
                    setUser(null);
                });
        } else {
            // If the token is not available (or is removed)
            removeToken();
            setIsLoading(false);
            setUser(null);
            localStorage.removeItem('user');
        }
    };

    const logOutUser = () => {
        // To log out the user, remove the token
        removeToken();

        // And update the state variables
        authenticateUser();
        navigate('/');
    };

    useEffect(() => {
        authenticateUser();
    }, []);

    /* 
        Functions for handling the authentication status (isLoggedIn, isLoading, user)
        will be added here later in the next step
    */

    return (
        <AuthContext.Provider
            value ={{
                isLoading,
                user,
                storeToken,
                authenticateUser,
                logOutUser,
                getToken,
                getUser
            }}
        >
            { children }
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };