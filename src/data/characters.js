// characters.js
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
        else if(key === "bounty" && character.cross_guild_bounty === false) {
            if(value === "None") {
                if(attributeMap.has("No Bounty"))
                    attributeMap.get("No Bounty").add(character.name);
                else
                    attributeMap.set("No Bounty", new Set([character.name]));
            }
            else if(value !== "Unknown") {
                let bounty = parseInt(value.replace(/\,/g, ""));
                // if(character.name === "Monkey D. Luffy") console.log(`value: ${value}       bounty: ${bounty}`)
                if(bounty < 100000) {
                    if(attributeMap.has("0-100,000"))
                        attributeMap.get("0-100,000").add(character.name);
                    else
                        attributeMap.set("0-100,000", new Set([character.name]));
                }
                else if(bounty < 500000) {
                    if(attributeMap.has("100,000-500,000"))
                        attributeMap.get("100,000-500,000").add(character.name);
                    else
                        attributeMap.set("100,000-500,000", new Set([character.name]));
                }
                else if(bounty < 1000000) {
                    if(attributeMap.has("500,000-1,000,000"))
                        attributeMap.get("500,000-1,000,000").add(character.name);
                    else
                        attributeMap.set("500,000-1,000,000", new Set([character.name]));
                }
                else if(bounty < 10000000) {
                    if(attributeMap.has("1,000,000-10,000,000"))
                        attributeMap.get("1,000,000-10,000,000").add(character.name);
                    else
                        attributeMap.set("1,000,000-10,000,000", new Set([character.name]));
                }
                else if(bounty < 50000000) {
                    if(attributeMap.has("10,000,000-50,000,000"))
                        attributeMap.get("10,000,000-50,000,000").add(character.name);
                    else
                        attributeMap.set("10,000,000-50,000,000", new Set([character.name]));
                }
                else if(bounty < 100000000) {
                    if(attributeMap.has("50,000,000-100,000,000"))
                        attributeMap.get("50,000,000-100,000,000").add(character.name);
                    else
                        attributeMap.set("50,000,000-100,000,000", new Set([character.name]));
                }
                else if(bounty < 500000000) {
                    if(attributeMap.has("100,000,000-500,000,000"))
                        attributeMap.get("100,000,000-500,000,000").add(character.name);
                    else
                        attributeMap.set("100,000,000-500,000,000", new Set([character.name]));
                }
                else if(bounty < 1000000000) {
                    if(attributeMap.has("500,000,000-1,000,000,000"))
                        attributeMap.get("500,000,000-1,000,000,000").add(character.name);
                    else
                        attributeMap.set("500,000,000-1,000,000,000", new Set([character.name]));
                }
                else if(bounty >= 1000000000) {
                    if(attributeMap.has("1,000,000,000+"))
                        attributeMap.get("1,000,000,000+").add(character.name);
                    else
                        attributeMap.set("1,000,000,000+", new Set([character.name]));
                }
            }
        }
        else if(key !== "id" && key !== "name" && key !== "image" && key !== "occupation" && key !== "status" && key !== "dfname" && key !== "dfename" && key !== "debut") {
            if(attributeMap.has(value)) {
                attributeMap.get(value).add(character.name);
            }
            else
                attributeMap.set(value, new Set([character.name]));
        }
    }
})

console.log(attributeMap.get("No Bounty"))
console.log(attributeMap.get("0-100,000"))
console.log(attributeMap.get("100,000-500,000"))
console.log(attributeMap.get("500,000-1,000,000"))
console.log(attributeMap.get("1,000,000-10,000,000"))
console.log(attributeMap.get("10,000,000-50,000,000"))
console.log(attributeMap.get("50,000,000-100,000,000"))
console.log(attributeMap.get("100,000,000-500,000,000"))
console.log(attributeMap.get("500,000,000-1,000,000,000"))
console.log(attributeMap.get("1,000,000,000+"))

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