const characters = [
    {
      id: 1,
      name: "Monkey D. Luffy",
      gender: "Male",
      df_types: ["Paramecia", "Mythical Zoan"],
      race: "Human",
      origin: "East Blue",
      affiliations: ["Straw Hat Pirates", "The Revolutionary Army"],
      haki_types: ["Conqueror's Haki", "Armament Haki", "Observation Haki"],
      will_of_d: true,
    },
    {
      id: 2,
      name: "Roronoa Zoro",
      gender: "Male",
      df_types: ["No Devil Fruit"],
      race: "Human",
      origin: "East Blue",
      affiliations: ["Straw Hat Pirates"],
      haki_types: ["Armament Haki", "Observation Haki"],
      will_of_d: false,
    },
    {
      id: 3,
      name: "Nami",
      gender: "Female",
      df_types: ["No Devil Fruit"],
      race: "Human",
      origin: "East Blue",
      affiliations: ["Straw Hat Pirates"],
      haki_types: ["No Haki"],
      will_of_d: false,
    },
    {
      id: 4,
      name: "Usopp",
      gender: "Male",
      df_types: ["No Devil Fruit"],
      race: "Human",
      origin: "East Blue",
      affiliations: ["Straw Hat Pirates"],
      haki_types: ["Observation Haki"],
      will_of_d: false,
    },
    {
      id: 5,
      name: "Sanji",
      gender: "Male",
      df_types: ["No Devil Fruit"],
      race: "Human",
      origin: "North Blue",
      affiliations: ["Straw Hat Pirates"],
      haki_types: ["Armament Haki", "Observation Haki"],
      will_of_d: false,
    },
    {
      id: 6,
      name: "Tony Tony Chopper",
      gender: "Male",
      df_types: ["Zoan", "Human-Human Fruit"],
      race: "Reindeer",
      origin: "Drum Island",
      affiliations: ["Straw Hat Pirates"],
      haki_types: ["No Haki"],
      will_of_d: false,
    },
    {
      id: 7,
      name: "Nico Robin",
      gender: "Female",
      df_types: ["Paramecia"],
      race: "Human",
      origin: "West Blue",
      affiliations: ["Straw Hat Pirates", "The Revolutionary Army"],
      haki_types: ["Armament Haki"],
      will_of_d: false,
    },
    {
      id: 8,
      name: "Franky",
      gender: "Male",
      df_types: ["No Devil Fruit"],
      race: "Human",
      origin: "South Blue",
      affiliations: ["Straw Hat Pirates"],
      haki_types: ["No Haki"],
      will_of_d: false,
    },
    {
      id: 9,
      name: "Brook",
      gender: "Male",
      df_types: ["Paramecia"],
      race: "Skeleton",
      origin: "Unknown (Formerly West Blue)",
      affiliations: ["Straw Hat Pirates"],
      haki_types: ["Armament Haki"],
      will_of_d: false,
    },
    {
      id: 10,
      name: "Jinbe",
      gender: "Male",
      df_types: ["No Devil Fruit"],
      race: "Fish-Man",
      origin: "Fish-Man Island",
      affiliations: ["Straw Hat Pirates"],
      haki_types: ["Armament Haki", "Observation Haki"],
      will_of_d: false,
    },
    {
      id: 11,
      name: "Trafalgar D. Water Law",
      gender: "Male",
      df_types: ["Paramecia"],
      race: "Human",
      origin: "North Blue",
      affiliations: ["Heart Pirates"],
      haki_types: ["Armament Haki", "Observation Haki"],
      will_of_d: true,
    },
    {
      id: 12,
      name: "Buggy",
      gender: "Male",
      df_types: ["Paramecia"],
      race: "Human",
      origin: "Grand Line",
      affiliations: ["Buggy Pirates"],
      haki_types: ["No Haki"],
      will_of_d: false,
    },
    {
      id: 13,
      name: "Boa Hancock",
      gender: "Female",
      df_types: ["Paramecia"],
      race: "Human",
      origin: "Amazon Lily",
      affiliations: ["Kuja Pirates"],
      haki_types: ["Conqueror's Haki", "Armament Haki", "Observation Haki"],
      will_of_d: false,
    },
    {
      id: 14,
      name: "Dracule Mihawk",
      gender: "Male",
      df_types: ["No Devil Fruit"],
      race: "Human",
      origin: "Grand Line",
      affiliations: ["Warlords of the Sea"],
      haki_types: ["Armament Haki", "Observation Haki"],
      will_of_d: false,
    },
    {
      id: 15,
      name: "Donquixote Doflamingo",
      gender: "Male",
      df_types: ["Paramecia"],
      race: "Human",
      origin: "North Blue",
      affiliations: ["Donquixote Pirates", "Warlords of the Sea"],
      haki_types: ["Conqueror's Haki", "Armament Haki", "Observation Haki"],
      will_of_d: false,
    },
    {
      id: 16,
      name: "Portgas D. Ace",
      gender: "Male",
      df_types: ["Logia"],
      race: "Human",
      origin: "South Blue",
      affiliations: ["Whitebeard Pirates"],
      haki_types: ["Armament Haki", "Observation Haki"],
      will_of_d: true,
    },
    {
      id: 17,
      name: "Marco",
      gender: "Male",
      df_types: ["Mythical Zoan", "Phoenix"],
      race: "Human",
      origin: "Grand Line",
      affiliations: ["Whitebeard Pirates"],
      haki_types: ["Armament Haki", "Observation Haki"],
      will_of_d: false,
    },
    {
      id: 18,
      name: "Edward Newgate (Whitebeard)",
      gender: "Male",
      df_types: ["No Devil Fruit"],
      race: "Human",
      origin: "Grand Line",
      affiliations: ["Whitebeard Pirates"],
      haki_types: ["Conqueror's Haki", "Armament Haki", "Observation Haki"],
      will_of_d: false,
    },
    {
      id: 19,
      name: "Shanks",
      gender: "Male",
      df_types: ["No Devil Fruit"],
      race: "Human",
      origin: "Grand Line",
      affiliations: ["Red Hair Pirates"],
      haki_types: ["Conqueror's Haki", "Armament Haki", "Observation Haki"],
      will_of_d: false,
    },
    {
      id: 20,
      name: "Blackbeard (Marshall D. Teach)",
      gender: "Male",
      df_types: ["Logia", "Paramecia"],
      race: "Human",
      origin: "Unknown",
      affiliations: ["Blackbeard Pirates", "Warlords of the Sea"],
      haki_types: ["No Haki"],
      will_of_d: true,
    },
    {
      id: 21,
      name: "Kaido",
      gender: "Male",
      df_types: ["No Devil Fruit"],
      race: "Human",
      origin: "Grand Line",
      affiliations: ["Beast Pirates"],
      haki_types: ["Conqueror's Haki", "Armament Haki", "Observation Haki"],
      will_of_d: false,
    },
    {
      id: 22,
      name: "Big Mom (Charlotte Linlin)",
      gender: "Female",
      df_types: ["No Devil Fruit"],
      race: "Human",
      origin: "Grand Line",
      affiliations: ["Big Mom Pirates"],
      haki_types: ["Conqueror's Haki", "Armament Haki", "Observation Haki"],
      will_of_d: false,
    },
    {
      id: 23,
      name: "Charlotte Katakuri",
      gender: "Male",
      df_types: ["Special Paramecia"],
      race: "Human",
      origin: "Grand Line",
      affiliations: ["Big Mom Pirates"],
      haki_types: ["Conqueror's Haki", "Armament Haki", "Observation Haki"],
      will_of_d: false,
    },
    {
      id: 24,
      name: "Eustass Kid",
      gender: "Male",
      df_types: ["Paramecia"],
      race: "Human",
      origin: "South Blue",
      affiliations: ["Kid Pirates"],
      haki_types: ["Conqueror's Haki", "Armament Haki", "Observation Haki"],
      will_of_d: false,
    },
    {
      id: 25,
      name: "Scratchmen Apoo",
      gender: "Male",
      df_types: ["Paramecia"],
      race: "Longarm Tribe",
      origin: "Grand Line",
      affiliations: ["On Air Pirates"],
      haki_types: ["Armament Haki"],
      will_of_d: false,
    },
    {
      id: 26,
      name: "Basil Hawkins",
      gender: "Male",
      df_types: ["Paramecia"],
      race: "Human",
      origin: "North Blue",
      affiliations: ["Hawkins Pirates"],
      haki_types: ["Armament Haki", "Observation Haki"],
      will_of_d: false,
    },
    {
      id: 27,
      name: "X Drake",
      gender: "Male",
      df_types: ["Ancient Zoan"],
      race: "Human",
      origin: "North Blue",
      affiliations: ["Drake Pirates", "Beast Pirates (formerly)"],
      haki_types: ["Armament Haki", "Observation Haki"],
      will_of_d: false,
    },
    {
      id: 28,
      name: "Jewelry Bonney",
      gender: "Female",
      df_types: ["No Devil Fruit"],
      race: "Human",
      origin: "South Blue",
      affiliations: ["Bonney Pirates"],
      haki_types: ["No Haki"],
      will_of_d: false,
    },
    {
      id: 29,
      name: "Capone Bege",
      gender: "Male",
      df_types: ["Paramecia"],
      race: "Human",
      origin: "West Blue",
      affiliations: ["Fire Tank Pirates"],
      haki_types: ["Armament Haki"],
      will_of_d: false,
    },
    {
      id: 30,
      name: "Vinsmoke Sanji",
      gender: "Male",
      df_types: ["No Devil Fruit"],
      race: "Human",
      origin: "North Blue",
      affiliations: ["Straw Hat Pirates", "Germa 66"],
      haki_types: ["Armament Haki", "Observation Haki"],
      will_of_d: false,
    },
  ];

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
        if(key === "df_types" || key === "affiliations" || key === "haki_types") {
            for(let v of value) {
                if(attributeMap.has(v)) {
                    attributeMap.get(v).add(character.name);
                }
                else
                    attributeMap.set(v, new Set([character.name]));
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
        else if(key !== "id" && key !== "name") {
            if(attributeMap.has(value)) {
                attributeMap.get(value).add(character.name);
            }
            else
                attributeMap.set(value, new Set([character.name]));
        }
    }
})

console.log(attributeMap)

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