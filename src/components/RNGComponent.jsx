import React from "react";
import { useRNG } from "../context/RNGContext";

const RNGComponent = () => {
    const { getNextRandom } = useRNG();

    return(
        <div>
            <h1>Random Number Generator</h1>
            <button onClick={() => alert(getNextRandom(100))}>
                Generate Random Number
            </button>
        </div>
    )
}

export default RNGComponent;