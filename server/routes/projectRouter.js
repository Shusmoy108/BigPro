const express = require("express");
const projectRouter = express.Router();

const Project = require("../models/Project");
const passport = require("passport");
require("../settings/passport")(passport);
projectRouter.post(
  "/insert",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    Project.insertProject(req.body.data, (status, err, data) => {
      if (status === 200) {
        console.log("su");
        return res.json({
          success: true,
          authorized: true,
          user: req.user,
          project: data
        });
      } else {
        console.log("s12u", err);
        return res.json({
          success: false,
          authorized: true,
          user: req.user,
          err: err
        });
      }
    });
  }
);
projectRouter.get(
  "/getprojects/:project_status",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    Project.getAllProjects(req.params.project_status, (status, err, data) => {
      if (status === 200) {
        console.log("su");
        return res.json({
          success: true,
          authorized: true,
          user: req.user,
          projects: data
        });
      } else {
        console.log("s12u", err);
        return res.json({
          success: false,
          authorized: true,
          user: req.user,
          err: err
        });
      }
    });
  }
);

module.exports = projectRouter;
