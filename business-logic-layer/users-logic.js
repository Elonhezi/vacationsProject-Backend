const dal = require("../data-access-layer/dal");
const cryptoHelper = require("../helpers/crypto-helper");


async function getAllUsersAsync() {
    const sql =`SELECT * FROM users`;
    const users = await dal.executeAsync(sql);
    return users;
}

async function deleteUserAsync(uuid) {
    const sql = `DELETE FROM users WHERE uuid = ?`;
    await dal.executeAsync(sql,[ uuid ]);
}

async function getOneUserAsync(uuid) {
    const sql = `SELECT * FROM users WHERE uuid = ?`;
    const user = await dal.executeAsync(sql, [ uuid ]);
    if (user.length === 0) return null; 
    return user[0];
}

async function updateFullUserAsync(user) {
    user.password = cryptoHelper.hash(user.password); // Hash password
    const sql = `UPDATE users SET uuid = ?', firstName = ? , lastName = ?', userName = ?, users.password = ?', isAdmin = ?
                WHERE uuid = ?`;            
    const info = await dal.executeAsync(sql ,[user.uuid, user.firstName, user.lastName, user.userName, user.password, user.isAdmin, user.uuid]);

    // Delete password so it won't returned to the frontend:
    delete user.password;
    return info.affectedRows === 0 ? null : user;
}

module.exports = {
    getAllUsersAsync,
    getOneUserAsync,
    deleteUserAsync,
    updateFullUserAsync
};