import React, {useContext} from "react";
import AuthContext from "./AuthContextProvider";
import {Navigate} from "react-router-dom";

// Interface for ProtectedRoute component props
// children -- Any other JSX.Element that will need to be rendered for a specific path
// altComponent -- OPTIONAL, it is used in case a route wants to display an alternative component (see path "/" in App.tsx)
// accessBy -- the string prompt that decides who accesses the path, currently authenticated users/non-authenticated users
// rerouteTo -- OPTIONAL, defines the path, the route should navigate to in case of no-access, by default is "/"
interface ProtectedRouteProps{
    children: JSX.Element,
    altComponent?: JSX.Element;
    accessBy: string,
    rerouteTo?: string
}

// Type alias to provide info on the contents of user context variable
type UserDataType = {
    first_name: string,
    last_name: string,
    id: number,
    user_type:string
}

// ProtectedRoute component is used to make a Route element (see App.tsx) a protected route.
// Protected routes can be either accessible to those authenticated or non-authenticated.
// In addition, the component props help to define how and where the user is redirected to
const ProtectedRoute:React.FC<ProtectedRouteProps> = ({ children, altComponent, accessBy , rerouteTo="/"}) => {

    // Using the User context to see if a user is authenticated (See AuthContextProvider.tsx for more)
    const { user } = useContext(AuthContext);

    // Stringify the JSON object
    const userDataString = JSON.stringify(user);

    // Parse the JSON string
    const userData:UserDataType = JSON.parse(userDataString);

    if (accessBy === "non-authenticated") {
        if (!user) {
            return children;
        }

    } else if (accessBy === "authenticated") {
        if (user) {
            return children;
        }

    } else if (accessBy === "authenticated-organization") {
        if (user && userData.user_type == "Organization") {
            return children;
        }
    }

    if (altComponent !== undefined) return altComponent;

    return <Navigate to={rerouteTo}></Navigate>;
};

export default ProtectedRoute;