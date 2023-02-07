import './App.css';
import React, {useEffect, useState} from "react";
import {Routes, Route, Navigate, useLocation} from "react-router-dom";
import NavMenu from './components/NavBarMenu/NavMenu';
import MainContent from './components/MainContent/MainContent';
import Login from "./components/LoginSignup/Login/Login";
import Signup from "./components/LoginSignup/Signup/Signup";
import AboutPage from "./components/AboutPage/AboutPage";
import UserProfile from "./components/UserProfile/UserProfile";
import UserMainContent from "./components/UserMainContent/UserMainContent";
import {AuthContextProvider} from "./AuthContextProvider";
function App() {

    const location = useLocation()
    useEffect(() => {
        console.log(location)
    }, [location])

    return (
      <div className="App">

          <header>
              <NavMenu />
          </header>

          <AuthContextProvider>
              <Routes>
                  <Route path="/" element={<MainContent />} />
                  <Route path="/login" element={<Login />}/>
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/about" element={<AboutPage/>} />
                  <Route path='/profile' element={<UserProfile />} />
              </Routes>
          </AuthContextProvider>


      </div>
    );
}

export default App;
