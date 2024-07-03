import React, {createContext, useCallback} from "react";
import characters from "../data/characters";
import { attributeMap } from "../data/characters";
import { useRNG } from "./RNGContext";

export const CharacterContext = createContext();

export const CharacterProvider = ({ children }) => {
    return (
        <CharacterContext.Provider value={{ characters, attributeMap }}>
            {children}
        </CharacterContext.Provider>
    )
}