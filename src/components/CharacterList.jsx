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
            {character.name} - {character.affiliation} (Gender: {character.gender})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterList;
