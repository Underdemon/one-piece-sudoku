import React, { createContext, useState, useContext, useCallback } from "react";
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
                    let attrib = selectSingleAttribute(randomValue);
                    if(attributeMap.get(attrib) !== undefined && !chosenAttribs.includes(attrib)) {
                        chosenAttribs.push(attrib);
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
                    let colAttrib = selectSingleAttribute(randomValue);
                    let colValues = attributeMap.get(colAttrib);
                    if(colValues === undefined  || chosenAttribs.includes(colAttrib))
                        continue;

                    let validIntersection = true;
                    for (let j = 0; j < size; j++) {
                        let rowAttrib = chosenAttribs[j];
                        let rowValues = attributeMap.get(rowAttrib);
                        if(rowAttrib === undefined || colValues.intersection(rowValues).size < 1) {
                            validIntersection = false;
                            break;
                        }
                    }

                    if(validIntersection) {
                        chosenAttribs.push(colAttrib);
                        valid = true;
                    }

                    if(count > 200)
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



// const getAttributes = useCallback((size) => {
    //     // size is the length of a row/column
    //     const chosenAttribs = [];
    
    //     let currentRng = rng; // Initialize with the current RNG state
    
    //     // generate enough attributes for all rows
    //     for (let i = 0; i < size; i++) {
    //         const [randomValue, nextRng] = prand.uniformIntDistribution(0, 10000, currentRng);
    //         if(attributeMap.get(randomValue) !== undefined)
    //             chosenAttribs.push(selectSingleAttribute(randomValue));
    //         else
    //             i--;
    //         currentRng = nextRng; // Update the current RNG state
    //     }
    
    //     console.log(chosenAttribs);
    
    //     for (let i = size; i < size * 2; i++) {
    //         let [randomValue, nextRng] = prand.uniformIntDistribution(0, 10000, currentRng);
    //         let colAttrib = selectSingleAttribute(randomValue);
    //         currentRng = nextRng; // Update the current RNG state
    
    //         let colValues = attributeMap.get(colAttrib);
    
    //         for (let j = 0; j < size; j++) {
    //             let rowAttrib = chosenAttribs[j];
    //             let rowValues = attributeMap.get(rowAttrib);
    //             if (rowValues === undefined) {
    //                 i--;
    //                 break;
    //             } else if (colValues.intersection(rowValues).size < 1) {
    //                 i--;
    //                 break;
    //             }
    //         }
    //         chosenAttribs.push(colAttrib);
    //     }
    
    //     console.log(chosenAttribs);
    //     return chosenAttribs;
    // }, [rng]);