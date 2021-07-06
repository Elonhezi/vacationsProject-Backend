const dal = require("../data-access-layer/dal");
const path = require("path");
const uuid = require("uuid"); 
const filesHelper = require("../helpers/files-helper"); 

async function getAllVacationsAsync() {
    const sql =`SELECT vacationId ,destination, DATE_FORMAT(startDate,"%Y-%m-%d")as startDate, DATE_FORMAT(endDate,"%Y-%m-%d")as endDate, price, description , img FROM vacations`;
    const vacations = await dal.executeAsync(sql);
    return vacations;
}

async function getOneVacationAsync(id) {
    const sql =`SELECT vacationId ,destination, DATE_FORMAT(startDate,"%Y-%m-%d")as startDate, DATE_FORMAT(endDate,"%Y-%m-%d")as endDate, price, description , img FROM vacations
                WHERE vacationId = ?`;
    const vacation = await dal.executeAsync(sql,[id]);
    if (vacation.length === 0) return null; 
    return vacation;
}

async function addVacationAsync(vacation, image) {
    if(!image) {
        return null;
    }
    const extension = image.name.substr(image.name.lastIndexOf("."));
    const newFileName = uuid.v4() + extension;
    const sql = `INSERT INTO vacations VALUES (DEFAULT, ?, ?, ?, ?, ?, ?)`;
    const info = await dal.executeAsync(sql,[vacation.destination, vacation.startDate, vacation.endDate, vacation.price, vacation.description, newFileName]); 
    vacation.vacationId = info.insertId;
    vacation.img = newFileName;
    const absolutePath = path.join(__dirname, "..", "images", "vacations", vacation.img);
    await image.mv(absolutePath);
    return vacation;
}

async function updateFullVacationAsync(vacation, newImage, currentImageName) {
    let newFileName = uuid.v4();
    if(!newImage){
        vacation.img = currentImageName;
    }
    else{
        let absolutePath = path.join(__dirname, "..", "images", "vacations",currentImageName);
        filesHelper.safeDelete(absolutePath);
        const extension = newImage.name.substr(newImage.name.lastIndexOf("."));
        imageName = newFileName + extension ;
        vacation.img = imageName;
        absolutePath = path.join(__dirname, "..", "images", "vacations", imageName);
        await newImage.mv(absolutePath);
    }
    const sql = `UPDATE vacations SET destination = ?, startDate = ?, endDate = ?, price = ?, description = ?, img = ?
                WHERE vacations.vacationId = ?`;
    const info = await dal.executeAsync(sql,[vacation.destination, vacation.startDate, vacation.endDate, vacation.price, vacation.description, vacation.img, vacation.vacationId]);
    return info.affectedRows === 0 ? null : vacation;
}

async function deleteVacationAsync(id, currentImageName) {
    const sql = `DELETE FROM vacations WHERE vacationId = ?`;
    await dal.executeAsync(sql,[id]);
    const absolutePath = path.join(__dirname, "..", "images", "vacations", currentImageName);
    filesHelper.safeDelete(absolutePath);
}

// The order of the vacations is determined first by the vacations that a user follows and then the rest of the vacations:
async function getOrdersByVacationsFollowersAsync(userId) {
    const allVacations =`SELECT vacations.vacationId ,destination, DATE_FORMAT(startDate,"%Y-%m-%d")as startDate, DATE_FORMAT(endDate,"%Y-%m-%d")as endDate, price, description , img FROM vacations`;
    const sql = `${allVacations} LEFT JOIN (SELECT * FROM followers WHERE userId = ?) as following
                ON vacations.vacationId = following.vacationId
                ORDER BY following.userId DESC`;
    const vacations = await dal.executeAsync(sql,[userId]);
    return vacations;
}

module.exports = {
    getAllVacationsAsync,
    addVacationAsync,
    deleteVacationAsync,
    getOneVacationAsync,
    updateFullVacationAsync,
    getOrdersByVacationsFollowersAsync
};
