// src/components/CharacterList.jsx
import React, { useContext, useState } from 'react';
import { CharacterContext } from '../context/CharacterContext.jsx';
import './CharacterList.css';

const CharacterList = ({ onSelectCharacter }) => {
  const { characters } = useContext(CharacterContext);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCharacters = characters.filter(character =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='char-list'>
      <h1>Character List</h1>
      <input
        type="text"
        placeholder="Search characters..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <ul>
        {filteredCharacters.map((character) => (
          <li key={character.id} onClick={() => onSelectCharacter(character)}>
            {character.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterList;

// give each character an id while scraping OR remove all duplicate characters when scraping so that CharacterList can have a key
// change image scrape to stop at png