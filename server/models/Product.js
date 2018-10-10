const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    product_name:String,
    task_number:Number,
    task:[{
        task_name:String,
        subtask:[{
            subtask_name:String,
            subtask_type:String,
            subtask_option:[]
        }]
    }]
});
ProductSchema.statics.getUserlist = function(cb) {
    var that = this;
    this.find(function(err, users) {
        if (err) cb("Server error", null);
        else{
            cb(null, products);
        }
    });
};
module.exports = mongoose.model('Product', ProductSchema);