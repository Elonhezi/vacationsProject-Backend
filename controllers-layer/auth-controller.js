const express = require("express");
const authLogic = require("../business-logic-layer/auth-logic");
const UserModel = require("../models/UserModel");
const CredentialsModel = require("../models/CredentialsModel");
const errorHelper = require("../helpers/errors-helper");
const svgCaptcha = require("svg-captcha");
const cryptoHelper = require("../helpers/crypto-helper");
const verifyCaptcha = require("../middleware/verify-captcha");
const router = express.Router();

// CAPTCHA:
router.get("/captcha",(request, response) => {
    const captcha = svgCaptcha.create(); // Creates a new CAPTCHA image + text
    const image = captcha.data;
    const text = captcha.text;
    const hashedText = cryptoHelper.hash(text);
    response.cookie("text", hashedText); 
    response.type("svg").send(image);
});


// Register: 
// POST http://localhost:3001/api/auth/register
router.post("/register", verifyCaptcha , async (request, response)=> {
    try {
        // Data: 
        const newUser = new UserModel(request.body);
        // Validation: 
        const errors = newUser.validatePost();
        if (errors) return response.status(400).send(errors);
        if(await authLogic.isUsernameTaken(newUser.userName) === null) return response.status(400).send(`Username "${newUser.userName}" already taken.`);
        // Logic: 
        const addedUser = await authLogic.registerAsync(newUser);
        // Success: 
        response.status(201).json(addedUser);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

// Login: 
// POST http://localhost:3001/api/auth/login
router.post("/login", async (request, response) => {
    try {
        // Data: 
        const credentials = new CredentialsModel(request.body);
        // Validation: 
        const errors = credentials.validatePost();
        if (errors) return response.status(400).send(errors);
        // Logic: 
        const loggedInUser = await authLogic.loginAsync(credentials);
        if (!loggedInUser) return response.status(401).send("Incorrect username or password.");
        // Success: 
        response.json(loggedInUser);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

module.exports = router;