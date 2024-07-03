import React, { useEffect, useState } from 'react';
import { useRNG } from '../context/RNGContext.jsx';
import { selectAttributePair } from '../data/attributes.js'

const RandomCharacterDisplay = () => {
    const { getRandomCharacters } = useRNG();
    const { getAttributes } = useRNG();
    const [randomCharacters, setRandomCharacters] = useState([]);

    useEffect(() => {
        // Ensure that getRandomCharacters is stable by memoizing it with useCallback
        const getAndSetRandomCharacters = () => {
            const characters = getRandomCharacters(12); // get 5 random characters
            setRandomCharacters(characters);
        };

        getAndSetRandomCharacters(); // Call the function immediately
        // console.log(getAttributes(3))
        // No need to include getRandomCharacters in the dependency array since it's stable
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Run the effect only once after component mounts

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
