const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const projectValidators = require("../Validator/projectValidator");
const ProjectSchema = new Schema({
    project_id: String,
    product_name: String,
    client_name: String,
    quantity: Number,
    deadline: Date,
    project_status: String,
    current_position: String,
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
                    current_position: data.task[0].taak_name,
                    completed_task: 0,
                    total_task: data.task.length,
                    task: data.task
                });
                newProject
                    .save()
                    .then(project => {
                        return cb(200, null, project);
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

module.exports = mongoose.model("Project", ProjectSchema);
