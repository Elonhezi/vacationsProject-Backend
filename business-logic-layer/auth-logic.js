const dal = require("../data-access-layer/dal");
const cryptoHelper = require("../helpers/crypto-helper");
const uuid = require("uuid");
const jwtHelper = require("../helpers/jwt-helper");

async function isUsernameTaken(userName) {
    const sql = `SELECT userName FROM users WHERE userName = ?`;
    const result = await dal.executeAsync(sql,[userName]);
    if(result.length > 0) return null;
}

async function registerAsync(user) {    
    user.password = cryptoHelper.hash(user.password); // Hash password
    user.uuid = uuid.v4();  // Create uuid 
    const sql = `INSERT INTO users VALUES (DEFAULT ,'${user.uuid}' , '${user.firstName}', '${user.lastName}', '${user.userName}', '${user.password}', false)`;
    await dal.executeAsync(sql);
    delete user.password; // Delete password so it won't returned to the frontend
    user.token = jwtHelper.getNewToken(user); // Generate new token
    return user;
}

async function loginAsync(existUser) {
    existUser.password = cryptoHelper.hash(existUser.password); // Hash exist password
    // Get back all columns without password and id:
    const sql = `SELECT uuid ,firstName, lastName, username, password, isAdmin FROM users WHERE userName = '${existUser.userName}' AND password = '${existUser.password}'`;
    const users = await dal.executeAsync(sql);
    if (users.length === 0) return null;
    const user = users[0];
    user.token = jwtHelper.getNewToken(user); // Generate new token
    return user;
}

module.exports = {
    isUsernameTaken,
    registerAsync,
    loginAsync
};