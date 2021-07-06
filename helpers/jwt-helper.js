const jwt = require("jsonwebtoken"); 

function getNewToken(payload) { // (payload will be the user object)
    // return jwt.sign({ payload }, config.jwtKey, { expiresIn: "30m" });
    return jwt.sign({ payload }, config.jwtKey, { expiresIn: "30s" });
}

module.exports = {
    getNewToken
};