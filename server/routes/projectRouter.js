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
      
        return res.json({
          success: true,
          authorized: true,
          user: req.user,
          project: data
        });
      } else {
        
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
        return res.json({
          success: true,
          authorized: true,
          user: req.user,
          projects: data
        });
      } else {
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
projectRouter.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    Project.deleteProject(req.params.id, (status, err, data) => {
      if (status === 200) {
        return res.json({
          success: true
        });
      } else {
        return res.json({
          success: false
        });
      }
    });
  }
);
projectRouter.post(
  "/edit/status/:id",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    Project.updateProjectStatus(
      req.params.id,
      req.body.status,
      (status, err, data) => {
        if (status === 200) {
          return res.json({
            success: true,
            project: data
          });
        } else {
          return res.json({
            success: false,
            err: err
          });
        }
      }
    );
  }
);
projectRouter.post(
  "/edit/progress/:id",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    Project.updateProjectProgress(
      req.params.id,
      req.body.current_position,
      req.body.next_position,
      req.body.task,
      req.body.inc,
      (status, err, data) => {
        if (status === 200) {
         
          return res.json({
            success: true,
            project: data
          });
        } else {
          return res.json({
            success: false,
            err: err
          });
        }
      }
    );
  }
);
projectRouter.get(
  "/show/:id",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    Project.findProject(req.params.id, (status, err, data) => {
      if (status === 200) {
        return res.json({
          success: true,
          authorized: true,
          user: req.user,
          project: data
        });
      } else {
        return res.json({
          success: false,
          authorized: true,
          user: req.user,
          err: err,
          project: data
        });
      }
    });
  }
);
module.exports = projectRouter;
