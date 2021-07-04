const crypto = require("crypto");

function hash(plainText) {
    if(!plainText) return null;
    // Hashing with salt:
    const salt = "MakeThingsGoRight"
    return crypto.createHmac("sha512", salt).update(plainText).digest("hex");
}

module.exports = {
    hash
};