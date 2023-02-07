import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(undefined);

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        let userProfile = localStorage.getItem("userProfile");
        if (userProfile) {
            return JSON.parse(userProfile);
        }
        return null;
    });
    const navigate = useNavigate();
    const login = async (payload) => {
        await axios.post("http://localhost:4000/auth/login", payload, {
            withCredentials: true,
        });
        let apiResponse = await axios.get("http://localhost:4000/user-profile", {
            withCredentials: true,
        });
        localStorage.setItem("userProfile", JSON.stringify(apiResponse.data));
        setUser(apiResponse.data);
        navigate("/");
    };
    return (
        <>
            <AuthContext.Provider value={{ user, login }}>
                {children}
            </AuthContext.Provider>
        </>
    );
};

export default AuthContext;