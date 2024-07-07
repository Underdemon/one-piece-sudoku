import React from "react";
import "./CharacterCard.css";

const CharacterCard = ({ character }) => {
    // do this in the scraper
    character.image = character.image.substring(0, character.image.indexOf(".png") + 4);

    return (
        <div className="character-card">
            <img src={character.image} alt={character.name} className="character-image" />
            <div className="character-name">{ character.name }</div>
        </div>
    );
};

export default CharacterCard;