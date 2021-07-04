const express = require("express");
const followersLogic = require("../business-logic-layer/followers-logic");
const usersLogic = require("../business-logic-layer/users-logic");
const errorHelper = require("../helpers/errors-helper");
const router = express.Router();

// get all details about vacation of all users:
// GET http://localhost:3001/api/followers
router.get("/" ,async (request, response)=> {
    try {
        // Logic:
        const followers = await followersLogic.getAllDetailsOfFollowersAsync();
        // Success:
        response.json(followers);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    } 
});

// GET http://localhost:3001/api/followers/user-count
router.get("/user-count" ,async (request, response)=> {
    try {
        // Logic:
        const followers = await followersLogic.getCountOfUsersFollowingAsync();
        // Success:
        response.json(followers);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }

});

// GET http://localhost:3001/api/followers/4
router.get("/:uuid" ,async (request, response)=> {
    try {
        const uuid = request.params.uuid; // get uuid
        // Get data about specific user:
        const user = await usersLogic.getOneUserAsync(uuid);
        const userId = user.userId;
        // Logic:
        const followers = await followersLogic.getOneFollowerAsync(userId);
        // Success:
        response.json(followers);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

// GET http://localhost:3001/api/followers/4/2
router.get("/:uuid/:vacationId" ,async (request, response)=> {
    try {
        const uuid = request.params.uuid; // get uuid User
        const vacationId = +request.params.vacationId; // get vacation ID
        // Get data about specific user:
        const user = await usersLogic.getOneUserAsync(uuid);
        const userId = user.userId;
        // Logic:
        const followers = await followersLogic.getOneFollowerByVacationAsync(userId, vacationId);
        if(!followers) return response.json          (followers);
        // Success:
        response.json(followers);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

// Get all details about vacation of specific user:
// GET http://localhost:3001/api/followers/by-user/7
router.get("/by-user/:id", async (request, response)=> {
    try {
        const id = +request.params.id; // Data:
        // Logic:
        const following = await followersLogic.getVacationsFollowingByUserIdAsync(id);
        if(!following) return response.status(404).send(`id ${id} not found..`);
        // Success:
        response.json(following);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});


// Get all details about users of specific vacation:
// GET http://localhost:3001/api/followers/by-vacation/7
router.get("/by-vacation/:id", async (request, response)=> {
    try {
        const id = +request.params.id; // Data
        // Logic:
        const following = await followersLogic.getUsersByVacationIdAsync(id);
        if(!following) return response.status(404).send(`id ${id} not found..`);
        // Success:
        response.json(following);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

// Add a new follow by user:
// POST http://localhost:3001/api/followers/userId/:vacationId
router.post("/:uuid/:vacationId", async (request, response) => {
    try {
        // Data:
        const uuid = request.params.uuid;
        const vacationId = +request.params.vacationId;
        // Get data about specific user:
        const user = await usersLogic.getOneUserAsync(uuid);
        const userId = user.userId;
        // Logic:
        const addedFollower = await followersLogic.addFollowingToVacationAsync(userId, vacationId);     
        // Success:
        response.status(201).json(addedFollower);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

// Unfollow to vacation by user:
// DELETE http://localhost:3001/api/followers/4
router.delete("/:uuid/:vacationId", async (request, response) => {
    try {
        // Data:
        const uuid = request.params.uuid;
        const vacationId = +request.params.vacationId;
        // Get data about specific user:
        const user = await usersLogic.getOneUserAsync(uuid);
        const userId = user.userId;
        // Logic:
        await followersLogic.deleteFollowAsync(userId, vacationId);
        // Success:
        response.sendStatus(204);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

module.exports = router