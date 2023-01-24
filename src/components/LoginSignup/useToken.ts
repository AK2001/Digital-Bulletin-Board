import {useState} from 'react';

function useToken() {

    // Used to retrieve the "token" stored in the localStorage
    // Only returns a token if it exists
    function getToken() {
        const userToken = localStorage.getItem('token');
        return userToken && userToken
    }

    // State used to handle the state of the token variable which contains the value of the token
    // This ensures that the application always reloads when any of the functions are called
    const [token, setToken] = useState(getToken());

    // Handles the storage of the token obtained when the user logs in
    function saveToken(token: string) {
        localStorage.setItem('token', token);
        setToken(token);
    }

    // Deletes the token from the local storage and returns the token back to the null state
    function removeToken() {
        localStorage.removeItem("token");
        setToken(null);
    }

    return {
        setToken: saveToken,
        token,
        removeToken
    }

}

export default useToken;