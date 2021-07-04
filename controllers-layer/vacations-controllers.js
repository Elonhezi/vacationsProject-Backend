const express = require("express");
const path = require("path");
const fs = require("fs");
const VacationModel = require("../models/VacationModel");
const vacationLogic = require("../business-logic-layer/vacations-logic");
const usersLogic = require("../business-logic-layer/users-logic");
const errorHelper = require("../helpers/errors-helper");
const verifyLoggedIn = require("../middleware/verify-logged-in");
const verifyAdmin = require("../middleware/verify-admin");
const router = express.Router();

// GET http://localhost:3001/api/vacations
router.get("/", verifyLoggedIn , async (request, response)=> {
    try {
        const vacations = await vacationLogic.getAllVacationsAsync();   // Logic
        response.json(vacations);      // Success
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

// GET http://localhost:3001/api/vacations/:id
router.get("/:id", verifyLoggedIn , async (request, response)=> {
    try {
        const id = +request.params.id; // Data:
        const vacation = await vacationLogic.getOneVacationAsync(id); // Logic
        if(!vacation) return response.status(404).send(`id ${id} not found..`);
        response.json(vacation); // Success
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

// GET http://localhost:3001/api/vacations/order-by/:uuid
router.get("/order-by/:uuid", async (request, response)=> {
    try {
        const uuid = request.params.uuid; // Data:
        // Get data about specific user:
        const user = await usersLogic.getOneUserAsync(uuid);
        const userId = user.userId;
        // Logic:
        const vacations = await vacationLogic.getOrdersByVacationsFollowersAsync(userId);   
        // Success:
        response.json(vacations);      
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

// POST http://localhost:3001/api/vacations
router.post("/", [verifyLoggedIn , verifyAdmin] ,async (request, response)=> {
    try {
        if(!request.files.img) return response.status(400).send("No Image sent!"); 
        // Data: 
        const newVacation = new VacationModel(request.body);
        // Validation: 
        const errors = newVacation.validatePost();
        if (errors) return response.status(400).send(errors);
        // Logic:         
        const addedVacation = await vacationLogic.addVacationAsync(newVacation , request.files ? request.files.img : null);
        if (!addedVacation) return response.status(400).send("No Image sent!");
        // Success: 
        response.status(201).json(addedVacation);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

// PUT http://localhost:3001/api/vacations/:id
router.put("/:id", [verifyLoggedIn , verifyAdmin] , async (request, response)=> {
    try {
        // Data:
        const id = +request.params.id;
        request.body.vacationId = id;
        const vacationToUpdate = new VacationModel(request.body);   
        const currentImageName = await vacationLogic.getOneVacationAsync(id);
        // Validation: 
        const errors = vacationToUpdate.validatePut();
        if (errors) return response.status(400).send(errors);
        // Logic:
        const updatedVacation = await vacationLogic.updateFullVacationAsync(vacationToUpdate , request.files ? request.files.img : null, currentImageName[0].img);
        if(!updatedVacation) return response.status(404).send(`id ${id} not found..`);
        // Success:
        response.status(201).json(updatedVacation);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

// DELETE http://localhost:3001/api/vacations/7
router.delete("/:id",[verifyLoggedIn , verifyAdmin], async (request, response)=> {
    try {
        // Data:
        const id = +request.params.id;
        const currentImageName = await vacationLogic.getOneVacationAsync(id);
        // Logic:
        await vacationLogic.deleteVacationAsync(id, currentImageName[0].img);
        // Success:
        response.sendStatus(204);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

router.get("/images/:name", (request, response) => {
    try {
        // get image name from route:
        const name = request.params.name;
        let absolutePath = path.join(__dirname, "..", "images", "vacations", name);
        // when image not fround: 
        if (!fs.existsSync(absolutePath)) {
            absolutePath = path.join(__dirname, "..", "images", "not-found.jpg");
        }
        // Success:
        response.sendFile(absolutePath);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});



module.exports = router