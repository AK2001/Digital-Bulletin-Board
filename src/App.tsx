import './App.css';
import React, {useContext} from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import NavMenu from './components/NavBarMenu/NavMenu';
import MainContent from './components/MainContent/MainContent';
import Login from "./components/LoginSignup/Login/Login";
import Signup from "./components/LoginSignup/Signup/Signup";
import AboutPage from "./components/AboutPage/AboutPage";
import UserProfile from "./components/UserProfile/UserProfile";
import UserMainContent from "./components/UserMainContent/UserMainContent";
import AuthContext, {AuthContextProvider} from "./AuthContextProvider";
function App() {

    // const location = useLocation()
    // useEffect(() => {
    //     console.log(location)
    // }, [location])

    return (
      <div className="App">

          <AuthContextProvider>

              <header>
                  <NavMenu />
              </header>

              <Routes>

                  <Route path='/' element={
                      <ProtectedRoute accessBy={"non-authenticated"} altComponent={<UserMainContent />}>
                          <MainContent />
                      </ProtectedRoute>
                  } />

                  <Route path='/login' element={
                      <ProtectedRoute accessBy={"non-authenticated"}>
                          <Login />
                      </ProtectedRoute>
                  } />

                  <Route path='/signup' element={
                      <ProtectedRoute accessBy={"non-authenticated"}>
                          <Signup />
                      </ProtectedRoute>
                  } />

                  <Route path="/about" element={<AboutPage />} />

                  <Route path='/profile' element={
                      <ProtectedRoute accessBy={"authenticated"} rerouteTo={"/login"}>
                          <UserProfile />
                      </ProtectedRoute>
                  } />
              </Routes>
          </AuthContextProvider>


      </div>
    );
}

interface ProtectedRouteProps{
    children: JSX.Element,
    altComponent?: JSX.Element;
    accessBy: string,
    rerouteTo?: string
}

const ProtectedRoute:React.FC<ProtectedRouteProps> = ({ children, altComponent, accessBy , rerouteTo="/"}) => {

    const { user } = useContext(AuthContext);

    if (accessBy === "non-authenticated") {
        if (!user) {
            return children;
        }

    } else if (accessBy === "authenticated") {
        if (user) {
            return children;
        }
    }

    if (altComponent !== undefined) return altComponent;

    return <Navigate to={rerouteTo}></Navigate>;
};

export default App;
