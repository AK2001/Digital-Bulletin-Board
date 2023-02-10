import './App.css';
import React from "react";
import {Routes, Route} from "react-router-dom";
import NavMenu from './components/NavBarMenu/NavMenu';
import MainContentPage from './components/MainContentPage/MainContentPage';
import LoginPage from "./components/LoginSignup/LoginPage/LoginPage";
import SignupPage from "./components/LoginSignup/SignupPage/SignupPage";
import AboutPage from "./components/AboutPage/AboutPage";
import UserProfilePage from "./components/UserProfilePage/UserProfilePage";
import UserMainContent from "./components/UserMainContent/UserMainContent";
import AddTaskPage from "./components/AddTaskPage/AddTaskPage";
import {AuthContextProvider} from "./helpers/AuthContextProvider";
import ProtectedRoute from "./helpers/ProtectedRoute";
import BrowseTasksPage from "./components/BrowseTasksPage/BrowseTasksPage";
import TaskPage from "./components/TaskPage/TaskPage";


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
                          <MainContentPage />
                      </ProtectedRoute>
                  } />

                  <Route path='/login' element={
                      <ProtectedRoute accessBy={"non-authenticated"}>
                          <LoginPage />
                      </ProtectedRoute>
                  } />

                  <Route path='/signup' element={
                      <ProtectedRoute accessBy={"non-authenticated"}>
                          <SignupPage />
                      </ProtectedRoute>
                  } />


                  <Route path="/browseTasks">
                      <Route index element={<BrowseTasksPage />} />
                      <Route path=":taskId" element={<TaskPage />} />
                  </Route>

                  {/*<Route path="/browseTasks" element={<BrowseTasksPage />} />*/}
                  {/*<Route path="/browseTasks/?taskWithId=:taskId" element={<TaskPage />} />*/}

                  <Route path="/about" element={<AboutPage />} />

                  <Route path='/profile' element={
                      <ProtectedRoute accessBy={"authenticated"} rerouteTo={"/login"}>
                          <UserProfilePage />
                      </ProtectedRoute>
                  } />

                  <Route path='/addTask' element={
                      <ProtectedRoute accessBy={"authenticated-organization"} rerouteTo={"/login"}>
                          <AddTaskPage />
                      </ProtectedRoute>
                  } />

              </Routes>
          </AuthContextProvider>


      </div>
    );
}

export default App;
