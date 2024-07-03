import React from "react";
import { useRNG } from "../context/RNGContext";

const RNGattribs = () => {
    const { getAttributes } = useRNG();

    return(
        <div>
            <h1>Random Attribute Generator</h1>
            <button onClick={() => {let attributes = getAttributes(3); alert(JSON.stringify(attributes))}}>
                Generate Random Attributes
            </button>
        </div>
    )
}

export default RNGattribs;