import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {CharacterContext} from '../context/CharacterContext.jsx';
import './CharacterList.css';
import {debounce} from '../utils/debounce.js';

const CharacterList = ({onSelectCharacter}) => {
    const {characters} = useContext(CharacterContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const debouncedSearch = useCallback(
        debounce((value) => {
            setDebouncedSearchTerm(value);
        }, 300),
        []
    );

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        debouncedSearch(value);
    };

    const filteredCharacters = characters.filter(character =>
        character.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );

    return (
        <div className='char-list'>
            <h2>Guess your character...</h2>
            <p>PS: Type in a minimum of 2 characters for search results to show up</p>
            <div className="search-container">
                <i className="fas fa-search search-icon"></i>
                <input
                    type="text"
                    placeholder="Search characters..."
                    value={searchTerm}
                    onChange={handleSearch}
                    ref={inputRef}
                />
            </div>
            {debouncedSearchTerm.length >= 2 && (
                filteredCharacters.length > 0 ? (
                    <ul>
                        {filteredCharacters.map((character) => (
                            <li key={character.id}>
                                <img src={character.image.substring(0, character.image.indexOf(".png") + 4)}
                                     alt={character.name}/>
                                <span className="character-name">{character.name}</span>
                                <button onClick={() => onSelectCharacter(character)}>Select</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No results found</p>
                )
            )}
        </div>
    );
};

export default CharacterList;