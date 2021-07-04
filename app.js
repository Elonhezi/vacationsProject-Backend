global.config = require(process.env.NODE_ENV === "production" ? "./config-prod.json" : "./config-dev.json");

const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const vacationsController = require("./controllers-layer/vacations-controllers");
const vacationsSocketLogic = require("./business-logic-layer/vacation-socket-logic");
const usersController = require("./controllers-layer/users-controller");
const followersController = require("./controllers-layer/followers-controller");
const authController = require("./controllers-layer/auth-controller");
const cookie = require("cookie-parser");
const sanitize = require("./middleware/sanitize");
const server = express();

// get cookie from the front-end:
server.use(cookie());
const options = {
    origin: true,
    credentials: true,
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
}

server.use(cors(options));

// server.use(sanitize);

// Handle json body object so request.body will contain the json in the body:
server.use(express.json());

server.use(express.static(path.join(__dirname,"./Frontend")));

server.use(fileUpload());


// System errors - return specific message on system errors:
server.use((err, request, response, next) => {
    response.status(err.status).send(err.message);
});

// Map root routes to the controllers:
server.use("/api/vacations", vacationsController);
server.use("/api/users", usersController);
server.use("/api/followers", followersController);
server.use("/api/auth", authController);

server.use("*", (request,response)=> {
    response.sendFile(path.join(__dirname, "./Frontend/index.html"))
});

// Any non existing route (must be last):
server.use("*", (request, response) => {
    response.status(404).send("Route not found.");
});

// Upload server to the air:
const port = process.env.PORT || 3001;
const listener = server.listen(port, () => console.log("Listening on port $}"));
vacationsSocketLogic.start(listener);



