const express = require('express');
const taskRouter = express.Router();
const Task = require('../models/Task');
const passport = require('passport');
require('../settings/passport')(passport);


taskRouter.post('/create', passport.authenticate('jwt', { session: false}), function(req, res) {
    var task_name=req.body.taskname;
    console.log(task_name);
    var t= new Task();
    t.task_name=task_name;
    t.save(function (err) {
        if (err) return handleError(err);
        Task.find({} , function(err, tasks) {
            if (err) throw err;
            console.log(tasks);
            return res.json({success: true, authorized: true, user: req.user, tasks:tasks});
        });

    });


});
taskRouter.post('/show', passport.authenticate('jwt', { session: false}), function(req, res) {
    Task.find({} , function(err, tasks) {
        if (err) throw err;
        console.log(tasks);
        return res.json({success: true, authorized: true, user: req.user, tasks:tasks});
    });

});

taskRouter.post('/delete', passport.authenticate('jwt', { session: false}), function(req, res) {
    console.log("deleteproduct");
    Task.remove({ task_name: req.body.taskname }, function(err) {
        if (err) {
            return res.status(500).send({success: false, msg: 'Server Error.'});
        }
        else {
            Task.find({} , function(err, tasks) {
                if (err) throw err;
                console.log(tasks);
                return res.json({success: true, authorized: true, user: req.user, tasks:tasks});
            });
        }
    });


});
taskRouter.post('/edit', passport.authenticate('jwt', { session: false}), function(req, res) {
    console.log("editproducts");
    Task.update({task_name: req.body.taskname}, {$set: { task_name: req.body.editname}}, {upsert: true}, function(err){
        if (err) {
            return res.status(500).send({success: false, msg: 'Server Error.'});
        }
        else {
            Task.find({}, function (err, tasks) {
                if (err) throw err;
                console.log(tasks);
                return res.json({success: true, authorized: true, user: req.user, tasks: tasks});
            });
        }
    });
});
getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};
module.exports = taskRouter;