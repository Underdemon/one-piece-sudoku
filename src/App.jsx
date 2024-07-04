// src/App.jsx
import React from 'react';
import './App.css';
import Grid from './components/Grid';
import CharacterList from './components/CharacterList';
import { CharacterProvider } from './context/CharacterContext.jsx';
import { RNGProvider } from './context/RNGContext';
import RNGComponent from './components/RNGComponent';
import RandomCharacters from './components/RandomCharacters.jsx'
import RNGattribs from './components/RNGattribs.jsx'
import { SpeedInsights } from "@vercel/speed-insights/react"

function App() {
  return (
    <div>
      <CharacterProvider>
        <RNGProvider>
          <div>
            <h1>GRID</h1>
            {/* <CharacterList /> */}
            <Grid size={3} />
            {/* <RNGComponent />
            <RandomCharacters />
            <RNGattribs /> */}
          </div>
        </RNGProvider>
      </CharacterProvider>
      <SpeedInsights />
    </div>
  );
}

export default App;