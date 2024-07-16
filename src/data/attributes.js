// attributes.js
import { affiliation, origin, race, dftype, gender, haki, arcs } from "../../scraper/atribs.json"
let attributes = [affiliation, origin, race, dftype, gender, haki, arcs]
let attributesNames = ["affiliation", "origin", "race", "dftype", "gender", "haki", "arcs"];


function selectAttributePair(random) {
    let lists = attributes;
    const listPairs = [
        [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7],
        [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7],
        [2, 3], [2, 4], [2, 5], [2, 6], [2, 7],
        [3, 4], [3, 5], [3, 6], [3, 7],
        [4, 5], [4, 6], [4, 7],
        [5, 6], [5, 7],
        [6, 7]
    ];

    const totalCombinations = listPairs.reduce((sum, [i, j]) => sum + lists[i].length * lists[j].length, 0);

    let index = random % totalCombinations;
    let runningTotal = 0;
    
    for (const [i, j] of listPairs) {
        const numCombinations = lists[i].length * lists[j].length;
        if (index < runningTotal + numCombinations) {
            const localIndex = index - runningTotal;
            const attributeIndex1 = Math.floor(localIndex / lists[j].length);
            const attributeIndex2 = localIndex % lists[j].length;
            return [lists[i][attributeIndex1], lists[j][attributeIndex2]];
        }
        runningTotal += numCombinations;
    }
}

/*

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

*/
function selectSingleAttribute(random) {
    let lists = attributes;
    const totalAttributes = lists.reduce((sum, list) => sum + list.length, 0);    
    let bountyRange = Math.floor(Math.random() * (totalAttributes + 10));
    if(bountyRange <= 10) {
        switch(bountyRange) {
            case 1:
                return ["Bounty", "No Bounty"];
            /*
            case 2:
                return ["Bounty", "0-100,000"];
            case 3:
                return ["Bounty", "100,000-500,000"];
            case 4:
                return ["Bounty", "500,000-1,000,000"];
            */
            case 5:
                return ["Bounty", "1,000,000-10,000,000"];
            case 6:
                return ["Bounty", "10,000,000-50,000,000"];
            case 7:
                return ["Bounty", "50,000,000-100,000,000"];
            case 8:
                return ["Bounty", "100,000,000-500,000,000"];
            case 9:
                return ["Bounty", "500,000,000-1,000,000,000"];
            case 10:
                return ["Bounty", "1,000,000,000+"];
        }
    }
    let index = random % totalAttributes;
    for (let i = 0; i < lists.length; i++) {
        const list = lists[i];
        if (index < list.length) {
            if(attributesNames[i] === "arcs") {
                return Math.random() < 0.5 ? ["Appeared In", list[index]] : ["Debuted In", list[index]];
            }
            else
                return [attributesNames[i], list[index]];
        }
        index -= list.length;
    }
}

/*
no bounty, 0-50,000, 50,000-100,000, 100,000-500,000, 500,000-1,000,000, 1,000,000+
need to add bounty range characters to attributemap
select random attrib, 
generate rand number (range totalattributes + 6 (6 bounty ranges)) if number is <= 6 choose bounty range based on rand number. 
max 1 attribute is a bounty
*/

export default attributes;
export {selectAttributePair, selectSingleAttribute}

/*
generate first "column" (ie: first attribute, and 3 attributes to go along with it)
generate the attrib for next col (ie: 2nd attrib, check other 3 from 1st col work with it)
continue re-generating attrib until col valid
do same for last col
will have to generalise/change attributes to allow for a significant number of characters to be in each group (bigger groups = more likely for combination to be valid)

hashmap of char to attrib and attrib to char
for char to attrib map, attrib is stored as a js object

*/

// let pairs = [];
/*
for(let i = 0; i < attributes.length; i++) {
    let attributeObj = attributes[i];
    let key = Object.keys(attributeObj).find(k => k !== 'mutually_exclusive');
    let values = attributeObj[key];
    let isMutuallyExclusive = attributes[i].mutually_exclusive;

    for(let j = 0; j < values.length; j++) {
        let k = i;
        if(isMutuallyExclusive)
            k++;

        while(k < attributes.length) {
            let pairAttribObj = attributes[k];
            let pairKey = Object.keys(pairAttribObj).find(k => k !== 'mutually_exclusive');
            let pairValues = pairAttribObj[pairKey];
            for(let l = 0; l < pairValues.length; j++) {
                if(k === i && pairValues[l] !== values[j])
                    pairs.push([values[j], pairValues[l]]);
                else
                pairs.push([values[j], pairValues[l]]);
            }
        }
    }
}

SO BAD IT TAKES UP ALL MY RAM
ALSO i realised i dont need the mutual exclusivity stuff, ill only
focus on making the combinations between the different attributes

loop through attributes
for each value in attribute (eg: Male, Female)
loop through other attributes
for each value in other attribute
add attribute pair to pairs

O(n^4) WHAT DO

n lists of attributes
for each attribute, combine with each attribute in every other list

GOT IT
determinstically calculate the combination at some index
*/
// function getCombinationAtIndex(lists, index) {
//     let totalCombinations = 1;
//     for(let list of lists) {
//         totalCombinations *= list.length;
//     }

//     if(index >= totalCombinations) {
//         throw new Error("Index OOB");
//     }

//     let results = [];
//     let currIndex = index;

//     for(let i = 0; i < lists.length; i++) {
//         let list = lists[i];
//         let listSize = list.length;
//         let elementIndex = Math.floor(currIndex / totalCombinations * listSize);
//         results.push(list[elementIndex]);
//         currIndex = currIndex % (totalCombinations / listSize);
//     }

//     return results;
// }


    /*
2
    1) generate 6 attributes
    2) generate attribute permutations as list (eg: [SMILE, Logia], [SMILE, Zoan] etc)
    3) go through permutation until 9 possible combinations with > 1 char reached
    4) if 9 combinations cant be reached reroll attribute

    map.get([SMILE, Logia]).length > 0

    key: [SMILE, Logia]
    value: [character ABXX, character BCBBC]

    key: [SMILE, Zoan]
    value: [character JKSADNJKSD]

    */