const express = require("express");
const usersLogic = require("../business-logic-layer/users-logic");
const errorHelper = require("../helpers/errors-helper");
const UserModel = require("../models/UserModel");
const router = express.Router();

// GET http://localhost:3001/api/users
router.get("/" ,async (request, response)=> {
    try {
        const users = await usersLogic.getAllUsersAsync();  // Logic
        response.json(users); // Success
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

// GET http://localhost:3001/api/users/:uuid
router.get("/:uuid", async (request, response)=> {
    try {
        const uuid = request.params.uuid; // data
        const user = await usersLogic.getOneUserAsync(uuid); // logic
        if(!user) return response.status(404).send(`User not found.`);
        response.json(user);    // success
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

// DELETE http://localhost:3001/api/users/7
router.delete("/:uuid", async (request, response)=> {
    try {
        const uuid = request.params.uuid; // data
        await usersLogic.deleteUserAsync(uuid); // logic
        response.sendStatus(204); // success
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

// PUT http://localhost:3001/api/users/:id
router.put("/:uuid", async (request, response)=> {
    try {
        // Data:
        const uuid = request.params.uuid;
        request.body.uuid = uuid;
        const oneUser = new UserModel(request.body);
        // Validation: 
        const errors = oneUser.validatePut();
        if (errors) return response.status(400).send(errors);
        // Logic:
        const updatedUser = await usersLogic.updateFullUserAsync(oneUser);
        if(!updatedUser) return response.status(404).send(`User not found.`);
        response.json(updatedUser); // Success

    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

module.exports = router