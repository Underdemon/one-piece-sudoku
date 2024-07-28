import React, { useState, useEffect, useContext } from 'react';
import './Grid.css';
import strawHat from '../assets/straw_hat.svg';
import { useRNG } from '../context/RNGContext.jsx';
import CharacterList from './CharacterList.jsx';
import { CharacterContext } from '../context/CharacterContext.jsx';
import { attributeMap } from '../data/characters.js';
import CharacterCard from './CharacterCard.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';

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
  const [gameOver, setGameOver] = useState(false);
  const maxGuesses = 10;

  useEffect(() => {
    let attributes = getAttributes(3);
    setRowLabels(attributes.slice(0, 3));
    setColLabels(attributes.slice(3, 6));
  }, []);

  const handleCellClick = (row, col) => {
    if (selectedCell || gridData[row][col] !== '' || gameOver) return;
    console.log(`Cell clicked: (${row}, ${col})`);
    console.log(`${rowLabels[row][0]}: ${rowLabels[row][1]}   ${colLabels[col][0]}: ${colLabels[col][1]}`);
    setSelectedCell({ row, col });
    setShowCharacterList(true);
  };

  const closeCharacterList = () => {
    setShowCharacterList(false);
    setSelectedCell(null);
  };

  const handleCharacterSelect = (character) => {
    if (!selectedCell) return;
    const { row, col } = selectedCell;
    let [rowAttribType, rowAttrib] = rowLabels[row];
    let [colAttribType, colAttrib] = colLabels[col];

    if (rowAttribType === "Appeared In") {
      rowAttrib = "Appeared In: " + rowAttrib;
    } else if (rowAttribType === "Debuted In") {
      rowAttrib = "Debuted In: " + rowAttrib;
    }

    if (colAttribType === "Appeared In") {
      colAttrib = "Appeared In: " + colAttrib;
    } else if (colAttribType === "Debuted In") {
      colAttrib = "Debuted In: " + colAttrib;
    }

    const isValidChoice = attributeMap.get(rowAttrib).has(character.name) && attributeMap.get(colAttrib).has(character.name);
    setTotalGuesses(totalGuesses + 1);

    if (isValidChoice) {
      const newGridData = [...gridData];
      newGridData[row][col] = character;
      setGridData(newGridData);
    } else {
      setFailedGuesses(failedGuesses + 1);
    }

    if (totalGuesses + 1 == maxGuesses) {
      setGameOver(true);
    }

    setSelectedCell(null);
    setShowCharacterList(false);
  };

  const handleRefreshClick = () => {
    setGameOver(false);
  };

  // Add a new useEffect to handle changing the color of the guess counter after the game over state is reset
  useEffect(() => {
    if (!gameOver && totalGuesses >= maxGuesses) {
      const guessCounterElement = document.querySelector('.guess-counter');
      if (guessCounterElement) {
        guessCounterElement.style.backgroundColor = 'rgba(255,69,0,0.2)';
      }
    }
  }, [gameOver, totalGuesses])

  return (
    <div className="grid-container">
      <div className={`guess-counter ${showCharacterList ? 'blurred' : ''} ${gameOver ? 'game-over' : ''}`}>
        <span>Failed Guesses: {failedGuesses}</span>
        {totalGuesses >= maxGuesses ? (
          <span onClick={handleRefreshClick} style={{ cursor: 'pointer' }}>
            <FontAwesomeIcon icon={faRefresh} />
          </span>
        ) : ''}
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
                {cell ? <CharacterCard character={cell} /> : ''}
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
