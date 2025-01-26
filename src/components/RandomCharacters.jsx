import React, {useEffect, useState} from 'react';
import {useRNG} from '../context/RNGContext.jsx';

const RandomCharacterDisplay = () => {
    const {getRandomCharacters} = useRNG();
    const {getAttributes} = useRNG();
    const [randomCharacters, setRandomCharacters] = useState([]);

    useEffect(() => {
        // ensure that getRandomCharacters is stable by memoizing it with useCallback
        const getAndSetRandomCharacters = () => {
            const characters = getRandomCharacters(12);
            setRandomCharacters(characters);
        };

        getAndSetRandomCharacters();
        // no need to include getRandomCharacters in dependency array since it's stable
    }, []); // run the effect only once after component mounts

    return (
        <div>
            <h1>Random Characters</h1>
            <ul>
                {randomCharacters.map((char, index) => (
                    <li key={index}>{char.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default RandomCharacterDisplay;
