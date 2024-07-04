// src/components/Grid.js
import React, { useState, createContext, useEffect, useContext } from 'react';
import './Grid.css';
import strawHat from '../assets/straw_hat.svg';
import { useRNG } from '../context/RNGContext.jsx';
import CharacterList from './CharacterList.jsx';
import { CharacterContext } from '../context/CharacterContext.jsx';
import { attributeMap } from '../data/characters.js';

const Grid = ({ size }) => {
  const { getAttributes } = useRNG();
  const { characters } = useContext(CharacterContext);

  const [gridData, setGridData] = useState(
    Array(size).fill(null).map(() => Array(size).fill(''))
  );

  const [rowLabels, setRowLabels] = useState([]);
  const [colLabels, setColLabels] = useState([]);
  const [showCharacterList, setShowCharacterList] = useState(false);
  const [selectedCell, setSelectedCell] = useState(null);
  const [failedGuesses, setFailedGuesses] = useState(0);
  const [totalGuesses, setTotalGuesses] = useState(0);
  const maxGuesses = 10;

  useEffect(() => {
    let attributes = getAttributes(3);
    setRowLabels(attributes.slice(0, 3));
    setColLabels(attributes.slice(3, 6));
  }, [])

  const handleCellClick = (row, col) => {
    if (selectedCell || gridData[row][col] !== '' || totalGuesses >= maxGuesses) return;
    console.log(`Cell clicked: (${row}, ${col})`);
    console.log(`${rowLabels[row][0]}: ${rowLabels[row][1]}   ${colLabels[col][0]}: ${colLabels[col][1]}`);
    setSelectedCell({ row, col });
    setShowCharacterList(true);
  };

  const closeCharacterList = () => {
    setShowCharacterList(false);
    setSelectedCell(null);
  }

  const handleCharacterSelect = (character) => {
    if(!selectedCell) return;
    const { row, col } = selectedCell;
    const rowAttrib = rowLabels[row][1];
    const colAttrib = colLabels[col][1];

    const isValidChoice = attributeMap.get(rowAttrib).has(character.name) && attributeMap.get(colAttrib).has(character.name);
    setTotalGuesses(totalGuesses + 1);

    if(isValidChoice) {
      const newGridData = [...gridData];
      newGridData[row][col] = character.name;
      setGridData(newGridData);
    }
    else {
      setFailedGuesses(failedGuesses + 1);
    }

    if(totalGuesses + 1 >= maxGuesses) {
      alert("GAME OVER");
    }

    setSelectedCell(null);
    setShowCharacterList(false);
  }

  return (
    <div className="grid-container">
      <div className="guess-counter">
        <span>Failed Guesses: {failedGuesses}</span>
        <span>Total Guesses: {totalGuesses} / {maxGuesses}</span>
      </div>
      <div className={`grid ${showCharacterList ? 'blurred' : ''}`}>
        <div className="row">
          <div className="cell top-left">
            <img src={strawHat} alt="Straw Hat" className="straw-hat" />
          </div>
          {colLabels.map((label, colIndex) => (
            <div key={`col-label-${colIndex}`} className="label-cell">
              {`${label[0]}: ${label[1]}`}
            </div>
          ))}
        </div>
        {gridData.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            <div className="label-cell">{rowLabels[rowIndex] ? `${rowLabels[rowIndex][0]}: ${rowLabels[rowIndex][1]}` : rowIndex + 1}</div>
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`cell ${rowIndex === 0 && colIndex === size - 1 ? 'top-right' : ''} 
                  ${rowIndex === size - 1 && colIndex === 0 ? 'bottom-left' : ''} 
                  ${rowIndex === size - 1 && colIndex === size - 1 ? 'bottom-right' : ''}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
      {showCharacterList && (
        <div className='modal-overlay' onClick={closeCharacterList}>
          <div className='modal-content' onClick={(e) => e.stopPropagation()}>
            <CharacterList onSelectCharacter={handleCharacterSelect} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Grid;
