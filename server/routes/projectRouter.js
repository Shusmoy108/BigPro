const express = require("express");
const projectRouter = express.Router();

const Project = require("../models/Project");
const passport = require("passport");
require("../settings/passport")(passport);
projectRouter.post(
    "/insert",
    passport.authenticate("jwt", { session: false }),
    function(req, res) {
        console.log(req.body.data);
    }
);
module.exports = projectRouter;
