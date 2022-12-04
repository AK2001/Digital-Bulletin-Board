import React from 'react';
import './App.css';
import NavMenu from './components/NavBarMenu/NavMenu';
import MainContent from './components/MainContent/MainContent';

function App() {
  return (
    <div className="App">
        <header>
            {/*<NavMenu title={"Test"}/>*/}
            <NavMenu />
        </header>

        <main>
            <MainContent />
        </main>

    </div>
  );
}

export default App;
