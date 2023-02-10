import axios from "axios";
import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

// Type alias of context variables
// Here we declare the types of those variables
type AuthContextType = {
    user: string;
    signup: (data: string) => void;
    login: (data: string) => void;
    logout: () => void;
    createTask: (data: string) => void;
}

// createContext hook that initializes the "state" i.e., value
// of each variable
const AuthContext = createContext<AuthContextType>({
    user: "",
    signup: () => {},
    login: () => {},
    logout: () => {},
    createTask: () => {},
});

// Interface for the props of AuthContextProvider component
// The interface is used to declare the type of children props for this component
interface AuthProviderProps {
    children: React.ReactNode;
}


// AuthContextProvider is a component that deals with the Authentication in this app
// It's purpose is to provide a common context of authentication that is shared within
// the various components of this app (see App.tsx to see which components benefit from
// this context provider).
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

    const signup = async (payload: string) => {
        await axios.post("/api/signup", payload, {
            headers : {"Content-Type": "application/json"}
        }).then(() => {
            navigate("/login");
        })
          .catch(err => {
            if (err.response.status===400){
                window.alert("The email you gave is already in use")
            }
        });
    }

    // The login function that enables users to login into the app
    // Requires a Payload: string, that is the user's email and password
    // provided by the LoginPage.tsx component
    // Upon success, relevant information is stored within localStorage
    // Finally, another API call is made to collect the user's information
    // and also ensure that a proper connection (through an HTTP-only cookie exists)
    const login = async (payload: string) => {

        let login = true;

        // Axios POST call to log in, i.e., create an access token via an HTTP-only cookie
        await axios.post("/api/token", payload, {
            headers : {"Content-Type": "application/json"}
        }).then(() =>{
            localStorage.setItem("isUserLoggedIn", "true");
        }).catch(err => {
            login = false;
            if (err.response.status!==404) {
                window.alert("Email or password wrong")
            }
            console.log("Wrong email or password")
        });

        if (login) {
            // Axios GET call to collect user data from the backend
            let apiResponse = await axios.get("/profile");

            localStorage.setItem("userProfile", JSON.stringify(apiResponse.data));
            setUser(apiResponse.data);
            navigate("/");
        }
    };

    // Log out method, makes a POST call on /api/logout API, which deletes
    // the HTTP-only cookie created by the backend, so the user no longer is
    // connected to the system, also upon success navigates user to /login path
    const logout = async () => {

        await axios.get("/api/logout");

        localStorage.removeItem("isUserLoggedIn");
        localStorage.removeItem("userProfile");
        setUser(null);
        navigate("/login");
    };


    // Create task method, makes a POST call on /api/createTask API, which creates
    // a task based on the task data provided
    const createTask = async (taskData: string) => {

        // Axios POST call to create a task
        await axios.post("/api/createTask", taskData, {
            headers : {"Content-Type": "application/json", "X-CSRF-TOKEN": Cookies.get("csrf_access_token")}
        }).catch(err => {
            if (err.response.status!==401) {
                console.log(err)
            }
            console.log(err)
            console.log("Only users of type 'Organization' can create tasks")
        });

        navigate("/");
    }
    return (
        <>
            <AuthContext.Provider value={{ user, signup, login, logout, createTask }}>
                {children}
            </AuthContext.Provider>
        </>
    );
};

export default AuthContext;