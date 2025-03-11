const crypto = require("crypto");


function extractIncreasingSubstrings(name) {
    name = name.toLowerCase().replace(/[^a-z]/g, ""); 
    let maxSubstrings = [];
    let tempSubstring = "";

    for (let i = 0; i < name.length; i++) {
        if (tempSubstring.length === 0 || name[i] > tempSubstring[tempSubstring.length - 1]) {
            tempSubstring += name[i];
        } else {
            if (maxSubstrings.length === 0 || tempSubstring.length >= maxSubstrings[0].length) {
                if (tempSubstring.length > maxSubstrings[0]?.length) {
                    maxSubstrings = [];
                }
                maxSubstrings.push(tempSubstring);
            }
            tempSubstring = name[i];
        }
    }

    if (tempSubstring.length > 0 && (maxSubstrings.length === 0 || tempSubstring.length >= maxSubstrings[0].length)) {
        maxSubstrings.push(tempSubstring);
    }

    return maxSubstrings.join("");
}


function generateProductCode(name) {
    if (!name || typeof name !== "string") return "invalid-name";

    const hashed = crypto.createHash("md5").update(name).digest("hex").slice(0, 6);
    const substring = extractIncreasingSubstrings(name);
    const startIndex = name.toLowerCase().indexOf(substring[0]);
    const endIndex = startIndex + substring.length - 1;

    return `${hashed}-${startIndex}${substring}${endIndex}`;
}

module.exports = generateProductCode;
