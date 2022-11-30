import React from 'react';
import './App.css';
import NavMenu from './components/NavBarMenu/NavMenu';
import MainContent from './components/MainContent/MainContent';

function App() {
  return (
    <div className="App">
        <header>
            <NavMenu title={"Fuck"}/>
        </header>

        <main>
            {/*<br/><br/><br/>*/}
            {/*<h1 style={{position:"relative",left:"50%"}}>|</h1>*/}
            <MainContent />
        </main>

    </div>
  );
}

export default App;
