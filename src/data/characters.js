import characters from "../../scraper/characters.json"

  /*
  voice of all things
  types of blade: meito, wazamono, kokuto, yoto       https://onepiece.fandom.com/wiki/Sword#Classifications
  bounty range
  arcs they appear in
  rokushiki
  is devil fruit awakened
  heal by drinking milk
  origin & first encounter
  */

const characterMap = new Map();
const attributeMap = new Map();

characters.forEach(character => {
    characterMap.set(character.name, character);

    for(let [key, value] of Object.entries(character)) {
        if(key === "affiliation" || key === "race") {
            for(let v of value) {
                if(attributeMap.has(v)) {
                    attributeMap.get(v).add(character.name);
                }
                else
                    attributeMap.set(v, new Set([character.name]));
            }
        }
        else if (key === "haki") {
            for (let [hakiType, hasHaki] of Object.entries(value)) {
                if (hasHaki) {
                    if (attributeMap.has(hakiType)) {
                        attributeMap.get(hakiType).add(character.name);
                    } else {
                        attributeMap.set(hakiType, new Set([character.name]));
                    }
                }
            }
        }
        else if (key === "arcs") {
            for (let [arc, appeared] of Object.entries(value)) {
                if (appeared) {
                    const arcKey = `Appeared In: ${arc}`;
                    if (attributeMap.has(arcKey)) {
                        attributeMap.get(arcKey).add(character.name);
                    } else {
                        attributeMap.set(arcKey, new Set([character.name]));
                    }
                }
            }
        }
        else if (key === "debut_arc") {
            const debutArcKey = `Debuted In: ${value}`;
            if (attributeMap.has(debutArcKey)) {
                attributeMap.get(debutArcKey).add(character.name);
            } else {
                attributeMap.set(debutArcKey, new Set([character.name]));
            }
        }
        else if(key === "will_of_d") {
            if(value === true) {
                if(attributeMap.has("Will of D")) {
                    attributeMap.get("Will of D").add(character.name);
                }
                else
                    attributeMap.set("Will of D", new Set([character.name]));
            }
            else
                continue;
        }
        else if(key !== "id" && key !== "name" && key !== "image" && key !== "occupation" && key !== "status" && key !== "dfname" && key !== "dfename") {
            if(attributeMap.has(value)) {
                attributeMap.get(value).add(character.name);
            }
            else
                attributeMap.set(value, new Set([character.name]));
        }
    }
})

// console.log(attributeMap)

export default characters;
export { characterMap, attributeMap }


/*
characters.forEach(character => {
    characterMap.set(character.name, character);

    for(let [key, value] of Object.entries(character)) {
        if(key === "df_types" || key === "affiliations" || key === "haki_types") {
            for(let v of value) {
                if(attributeMap.has(v)) {
                    attributeMap.get(v).push(character.name);
                }
                else
                    attributeMap.set(v, [character.name]);
            }
        }
        else if(key === "will_of_d") {
            if(value === true) {
                if(attributeMap.has("Will of D")) {
                    attributeMap.get("Will of D").push(character.name);
                }
                else
                    attributeMap.set("Will of D", [character.name]);
            }
            else
                continue;
        }
        else if(key !== "id" && key !== "name") {
            if(attributeMap.has(value)) {
                attributeMap.get(value).push(character.name);
            }
            else
                attributeMap.set(value, [character.name]);
        }
    }
})
*/