const dal = require("../data-access-layer/dal");

async function getAllFollowersAsync() {
    const sql =`SELECT * FROM followers`;
    const followers = await dal.executeAsync(sql);
    return followers;
}

async function getCountOfUsersFollowingAsync () {
    const sql =`SELECT vacations.destination, vacations.vacationId, COUNT(userId) AS numberOfUsers FROM followers JOIN vacations on vacations.vacationId = followers.vacationId  GROUP BY vacations.vacationId`;
    const countFollowers = await dal.executeAsync(sql);
    return countFollowers;
}

async function getOneFollowerAsync(userId) {
    const sql =`SELECT * FROM followers WHERE userId = ? `;
    const followers = await dal.executeAsync(sql, [userId]);
    return followers;
}

async function getOneFollowerByVacationAsync(userId, vacationId) {
    const sql =`SELECT * FROM followers WHERE userId = ? AND vacationId = ?`;
    const followers = await dal.executeAsync(sql, [userId, vacationId]);
    if (followers.length === 0) return null; 
    return followers;
}

async function getAllDetailsOfFollowersAsync() {
    const sql =`SELECT followers.*, vacations.*, users.* 
    FROM followers JOIN vacations
    ON vacations.vacationId = followers.vacationId
    JOIN users
    ON users.userId = followers.userId`;
    const followers = await dal.executeAsync(sql);
    return followers;
}

async function addFollowingToVacationAsync(userId, vacationId) {
    const sql = `INSERT INTO followers (userId, vacationId) VALUES( ?, ?)`;
    await dal.executeAsync(sql, [ userId , vacationId ]);
}

async function deleteFollowAsync(userId , vacationId) {
    const sql = `DELETE FROM followers WHERE userId = ? AND vacationId =?`;
    await dal.executeAsync(sql, [ userId , vacationId ]);
}

async function getVacationsFollowingByUserIdAsync(id) {
    const sql =`SELECT followers.*, vacations.*, users.* 
                FROM followers JOIN vacations
                ON vacations.vacationId = followers.vacationId
                JOIN users
                ON users.userId = followers.userId
                WHERE followers.userId = ?`;
    const following = await dal.executeAsync(sql,[ id ]);
    if (following.length === 0) return null; 
    return following;
}

async function getUsersByVacationIdAsync(id) {
    const sql =`SELECT vacations.*, users.* 
                FROM followers JOIN vacations
                ON vacations.vacationId = followers.vacationId
                JOIN users
                ON users.userId = followers.userId
                WHERE followers.vacationId = ${id}`;
    const following = await dal.executeAsync(sql);
    if (following.length === 0) return null; 
    return following;
}

module.exports = {
    getAllFollowersAsync,
    getAllDetailsOfFollowersAsync,
    getVacationsFollowingByUserIdAsync,
    getUsersByVacationIdAsync,
    addFollowingToVacationAsync,
    deleteFollowAsync,
    getOneFollowerAsync,
    getOneFollowerByVacationAsync,
    getCountOfUsersFollowingAsync
};