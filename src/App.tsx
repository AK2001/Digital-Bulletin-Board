import React, {useState} from 'react';
import {Routes, Route} from "react-router-dom";
import './App.css';
import NavMenu from './components/NavBarMenu/NavMenu';
import MainContent from './components/MainContent/MainContent';
import axios from "axios";
import Login from "./components/LoginSignup/Login/Login";
import Signup from "./components/LoginSignup/Signup/Signup";
import AboutPage from "./components/AboutPage/AboutPage";

function App() {

   // new line start
   const [data, setdata] = useState({
        name: "",
        age: 0,
        date: "",
        programming: "",
    });

   function getData() {
    axios.post('/data') //http://localhost:5000
        .then(res => setdata({
            name: res.data.namee,
            age: res.data.agee,
            date: res.data.datee,
            programming: res.data.programmingg,
        })).catch(err => {
            console.log(err);
    });
    console.log(data)
   }



  return (
    <div className="App">
        <header>
            {/*<NavMenu title={"Test"}/>*/}
            <NavMenu />
        </header>

        <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<AboutPage/>} />
        </Routes>

        {/*<h1>React and flask</h1>*/}
        {/*        /!* new line start*!/*/}
        {/*<p>To get your profile details: </p><button onClick={getData}>Click me</button>*/}
        {/*{ <div>*/}
        {/*      <p>Data retrieved :</p>*/}
        {/*    <p>{data.name}</p>*/}
        {/*    <p>{data.age}</p>*/}
        {/*    <p>{data.date}</p>*/}
        {/*    <p>{data.programming}</p>*/}
        {/*    </div>*/}
        {/*}*/}
         {/* end of new line */}
    </div>
  );
}

export default App;
