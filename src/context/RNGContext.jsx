// RNGContext.jsx
import React, { createContext, useState, useContext, useCallback, useEffect } from "react";
import prand, { xoroshiro128plus } from "pure-rand";
import { CharacterContext } from '../context/CharacterContext.jsx';
import { selectSingleAttribute } from "../data/attributes.js";
import { attributeMap } from "../data/characters.js";

const RNGContext = createContext();

function getSeedFromDate() {
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0]; // "YYYY-MM-DD"
    let seed = 0;
    for (let i = 0; i < dateStr.length; i++) {
        seed += dateStr.charCodeAt(i);
    }
    
    return seed;
}

export const RNGProvider = ({ children }) => {
    const seed = getSeedFromDate();
    const [rng, setRng] = useState(() => xoroshiro128plus(seed));
    const { characters } = useContext(CharacterContext);

    useEffect(() => {
        setRng(xoroshiro128plus(seed));
    }, [seed]);

    // function gets next random number and updates rng
    const getNextRandom = useCallback((n) => {
        const [nextValue, nextRng] = prand.uniformIntDistribution(0, n, rng);
        setRng(nextRng);    // update rng state with next rng
        return nextValue;
    }, [rng])

    const getRandomCharacters = useCallback((count) => {
        if(!characters || characters.length === 0) return [];

        const chosenCharacters = [];
        const availableIndices = Array.from({ length: characters.length }, (_, i) => i);
        // Array.from() creates an array
        // {length: characters.length} specifies the length of the new array
        // (_, i) => i
            // the function receives 2 arguments, of which the first is ignore using _
            // 2nd arg is then mapped to itself, creating an array containing each index from 0 to characters.length

        for(let i = 0; i < count; i++) {
            if(availableIndices === 0) break;

            const randomIndex = getNextRandom(availableIndices.length - 1);
            // selects a random index and removes it from the array
            const chosenIndex = availableIndices.splice(randomIndex, 1)[0];
            chosenCharacters.push(characters[chosenIndex]);
        }
        return chosenCharacters;
    }, [characters, getNextRandom])

    const getAttributes = useCallback((size) => {
        // size is the length of a row/column
        let chosenAttribs = [];
        let currentRng = rng; // Initialize with the current RNG state
        
        breakLoop:
        while(true) {
            chosenAttribs = [];
            // generate enough attributes for all rows
            for(let i = 0; i < size; i++) {
                let valid = false;
                while(!valid) {
                    let [randomValue, nextRng] = prand.uniformIntDistribution(0, 10000000, currentRng);
                    currentRng = nextRng;
                    let [attribType, attrib] = selectSingleAttribute(randomValue);
                    if((attributeMap.get(attrib) !== undefined || attributeMap.get("Appeared In: " + attrib) !== undefined || attributeMap.get("Debuted In: " + attrib) !== undefined) && !chosenAttribs.some(attr => attr[1] === attrib)) {
                        chosenAttribs.push([attribType, attrib]);
                        valid = true;
                    }
                }
            }
            
            for(let i = 0; i < size; i++) {
                let valid = false;
                let count = 0;
                while(!valid) {
                    count++;
                    let [randomValue, nextRng] = prand.uniformIntDistribution(0, 10000000, currentRng);
                    currentRng = nextRng;
                    let [attribType, colAttrib] = selectSingleAttribute(randomValue);
                    let colValues = attributeMap.get(colAttrib);
                    if(attribType === "Appeared In") {
                        colValues = attributeMap.get("Appeared In: " + colAttrib);
                    }
                    else if(attribType === "Debuted In") {
                        colValues = attributeMap.get("Debuted In: " + colAttrib);
                    }

                    if(colValues === undefined  || chosenAttribs.some(attr => attr[1] === colAttrib))
                        continue;

                    let validIntersection = true;
                    for (let j = 0; j < size; j++) {
                        let [rowType, rowAttrib] = chosenAttribs[j];
                        let rowValues = attributeMap.get(rowAttrib);
                        if(rowType === "Appeared In") {
                            rowValues = attributeMap.get("Appeared In: " + rowAttrib);
                        }
                        else if(rowType === "Debuted In") {
                            rowValues = attributeMap.get("Debuted In: " + rowAttrib);
                        }


                        if (
                            rowAttrib === undefined ||
                            colValues === undefined ||
                            rowValues === undefined ||
                            !(colValues instanceof Set) ||
                            !(rowValues instanceof Set) ||
                            colValues.intersection(rowValues).size < 2 // the intersection size is the number of characters that fit any combination (so the number of possible characters that are valid)
                        ) 
                        {
                            validIntersection = false;
                            break;
                        }
                    }

                    if(validIntersection) {
                        chosenAttribs.push([attribType, colAttrib]);
                        valid = true;
                    }

                    if(count > 50)
                        continue breakLoop;
                }
            }
            break;
        }
    
        setRng(currentRng);
        return chosenAttribs;
    }, [rng]);

    return(
        <RNGContext.Provider value={{ rng, getNextRandom, getRandomCharacters, getAttributes }}>
            {children}
        </RNGContext.Provider>
    );
};

// custom hook to use the rng context
export const useRNG = () => useContext(RNGContext);