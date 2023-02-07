import axios from "axios";
import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// Type alias of context variables
// Here we declare the types of those variables
type AuthContextType = {
    user: string;
    login: (data: string) => void;
    logout: () => void;
}

// createContext hook that initializes the "state" i.e., value
// of each variable
const AuthContext = createContext<AuthContextType>({
    user: "",
    login: () => {},
    logout: () => {},
});

// Interface for the props of AuthContextProvider component
// The interface is used to declare the type of children props for this component
interface AuthProviderProps {
    children: React.ReactNode;
}


// AuthContextProvider is a component that deals with the Authentication in this app
// It's purpose is to provide a common context of authentication that is shared within
// the various components of this app (see App.tsx to see which components benefit from
// this context provider.
export const AuthContextProvider:React.FC<AuthProviderProps> = ({ children }) => {

    // Check the browser localStorage for the specific item key
    // If found, the function immediately returns.
    // This is useful in case the user reloads the page
    const [user, setUser] = useState(() => {
        let userProfile = localStorage.getItem("userProfile");
        if (userProfile) {
            return JSON.parse(userProfile);
        }
        return null;
    });

    // Create a constant that will hold useNavigate hook
    // used to "change" the path and thus components
    const navigate = useNavigate();

    // The login function that enables users to login into the app
    // Requires a Payload: string, that is the user's email and password
    // provided by the Login.tsx component
    // Upon success, relevant information is stored within localStorage
    // Finally, another API call is made to collect the user's information
    // and also ensure that a proper connection (through an HTTP-only cookie exists)
    const login = async (payload: string) => {

        // Axios POST call to log in, i.e., create a access token via an HTTP-only cookie
        await axios.post("/api/token", payload, {
            headers : {"Content-Type": "application/json"}
        }).then(() =>{
            localStorage.setItem("isUserLoggedIn", "true");
        }).catch(err => {
            console.log(err)
        });

        // Axios GET call to collect user data from the backend
        let apiResponse = await axios.get("/profile");

        localStorage.setItem("userProfile", JSON.stringify(apiResponse.data));
        setUser(apiResponse.data);
        navigate("/");
    };

    // Log out method, makes a POST call on /api/logout API, which deletes
    // the HTTP-only cookie created by the backend, so the user no longer is
    // connected to the system, also upon success navigates user to /login path
    const logout = async () => {

        await axios.post("/api/logout");

        localStorage.removeItem("isUserLoggedIn");
        localStorage.removeItem("userProfile");
        setUser(null);
        navigate("/login");
    };

    return (
        <>
            <AuthContext.Provider value={{ user, login, logout }}>
                {children}
            </AuthContext.Provider>
        </>
    );
};

export default AuthContext;