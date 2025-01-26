import React, {createContext} from "react";
import characters, {attributeMap} from "../data/characters";

export const CharacterContext = createContext();

export const CharacterProvider = ({children}) => {
    return (
        <CharacterContext.Provider value={{characters, attributeMap}}>
            {children}
        </CharacterContext.Provider>
    )
}