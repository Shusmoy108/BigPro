const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  project_id: String,
    product_name:String,
    client_name:String,
    quantity:Number,
    deadline: Date,
    project_status:String,
    current_position: String,
    completed_task: Number,
    total_task:Number,
    task:[{
      task_name:String,
        task_status:String,
        subtask:[{
          subtask_name:String,
            subtask_data:String
        }]
    }]
});
UserSchema.statics.getUserlist = function(cb) {
    var that = this;
    this.find(function(err, users) {
        if (err) cb("Server error", null);
        else{
            cb(null, users);
        }
    });
};


module.exports = mongoose.model('Project', ProjectSchema);
