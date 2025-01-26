// src/App.jsx
import React, {useState} from 'react';
import './App.css';
import Grid from './components/Grid';
import {CharacterProvider} from './context/CharacterContext.jsx';
import {RNGProvider} from './context/RNGContext';
import {SpeedInsights} from "@vercel/speed-insights/react"
import Background from "./components/Background.jsx";
import title from './assets/title.png';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
    const [sidebarVisible, setSidebarVisible] = useState(false);

    const handleDivClick = (event) => {
        event.stopPropagation();
    };

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const handleButtonClick = (event) => {
        handleDivClick(event);
        toggleSidebar();
    };

    return (
        <div>
            <Background/>
            <CharacterProvider>
                <RNGProvider>
                    <div onClick={handleDivClick} className="acrylic">
                        {/*<h1>ONE PIECE SUDOKU</h1>*/}
                        <img src={title} alt="One Piece Sudoku" className="title"/>
                        <Grid size={3}/>
                    </div>
                </RNGProvider>
            </CharacterProvider>
            <button className="info-button" onClick={handleButtonClick}>ℹ️</button>
            {sidebarVisible && (
                <div className="acrylic sidebar" onClick={handleDivClick}>
                    <p>Try click the background!</p>
                </div>
            )}
            <SpeedInsights/>
        </div>
    );
}

export default App;