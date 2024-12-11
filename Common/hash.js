const { scryptSync, randomBytes } = require("crypto");
const hasher = (input, salt) => {
    return scryptSync(input, salt, 32).toString("hex");
}

hash = (input, inSalt) => {
    let salt = inSalt;
    if(!salt){
        salt = randomBytes(16).toString("hex");
    }
    const hashed = hasher(input, salt);
    return {hashed: hashed, salt: salt};
}

module.exports = hash