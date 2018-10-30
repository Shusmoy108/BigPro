const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const projectValidators = require("../Validator/projectValidator");
const ProjectSchema = new Schema({
  project_id: String,
  product_name: String,
  client_name: String,
  quantity: Number,
  deadline: Date,
  project_status: String,
  current_position: String,
  next_position: String,
  completed_task: Number,
  total_task: Number,
  task: []
});
ProjectSchema.statics.insertProject = (data, cb) => {
  //////console.log(data);
  const { errors, isValid } = projectValidators.projectInput(data);
  ////console.log(data);
  // Check Validation
  if (!isValid) {
    return cb(400, errors, null);
  }
  let current_position = "";
  let next_position = "";
  if (data.task.length) {
    current_position = data.task[0].task_name;
    if (data.task.length > 1) {
      next_position = data.task[1].task_name;
    }
  }
  Project.findOne({ project_id: data.project_id })
    .then(project => {
      if (project) {
        errors.msg = "Project already exists";
        return cb(400, errors, null);
      } else {
        const newProject = new Project({
          project_id: data.project_id,
          product_name: data.product_name,
          client_name: data.client_name,
          quantity: data.quantity,
          deadline: data.deadline,
          project_status: "pending",
          current_position: current_position,
          next_position: next_position,
          completed_task: 0,
          total_task: data.task.length,
          task: data.task
        });
        newProject
          .save()
          .then(projecti => {
            return cb(200, null, projecti);
          })
          .catch(err => {
            return cb(500, { msg: "Internal server Error" }, null);
            // //console.log(err);
          });
      }
    })
    .catch(err => {
      errors.msg = "Internal server error";
      return cb(500, errors, null);
    });
};

ProjectSchema.statics.getAllProjects = (project_status, cb) => {
  ////console.log("here");
  //cb(200, null, "here");

  Project.find({ project_status: project_status }).exec(function(
    err,
    projects
  ) {
    if (err) {
      cb(500, { msg: "server error" }, null);
    } else {
      cb(200, null, projects);
    }
  });
};

module.exports = Project = mongoose.model("Project", ProjectSchema);
