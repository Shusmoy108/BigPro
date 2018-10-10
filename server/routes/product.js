const express = require('express');
const productRouter = express.Router();
const Product = require('../models/Product');
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('../settings/config');
require('../settings/passport')(passport);
const ObjectId = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken');

productRouter.post('/create', passport.authenticate('jwt', { session: false}), function(req, res) {
   var product_name=req.body.productname;
   var p= new Product();
   p.product_name=product_name;
   p.save(function (err) {
        if (err) return handleError(err);
       Product.find({} , function(err, products) {
           if (err) throw err;
           console.log(products);
           return res.json({success: true, authorized: true, user: req.user, products:products});
       });

    });


});
productRouter.post('/show', passport.authenticate('jwt', { session: false}), function(req, res) {
    Product.find({} , function(err, products) {
        if (err) throw err;
        console.log(products);
        return res.json({success: true, authorized: true, user: req.user, products:products});
    });

});

productRouter.post('/delete', passport.authenticate('jwt', { session: false}), function(req, res) {
    console.log("deleteproduc");
    Product.remove({ product_name: req.body.productname }, function(err) {
        if (err) {
            return res.status(500).send({success: false, msg: 'Server Error.'});
        }
        else {
            Product.find({} , function(err, products) {
                if (err) throw err;
                console.log(products);
                return res.json({success: true, authorized: true, user: req.user, products:products});
            });
        }
    });


});
productRouter.post('/edit', passport.authenticate('jwt', { session: false}), function(req, res) {
    console.log("editproducts");
    Product.update({product_name: req.body.productname}, {$set: { product_name: req.body.editname}}, {upsert: true}, function(err){
        if (err) {
            return res.status(500).send({success: false, msg: 'Server Error.'});
        }
        else {
            Product.find({}, function (err, products) {
                if (err) throw err;
                console.log(products);
                return res.json({success: true, authorized: true, user: req.user, products: products});
            });
        }
    });
});

productRouter.post('/edit', passport.authenticate('jwt', { session: false}), function(req, res) {
    console.log("editproducts");
    Product.update({product_name: req.body.productname}, {$set: { product_name: req.body.editname}}, {upsert: true}, function(err){
        if (err) {
            return res.status(500).send({success: false, msg: 'Server Error.'});
        }
        else {
            Product.find({}, function (err, products) {
                if (err) throw err;
                console.log(products);
                return res.json({success: true, authorized: true, user: req.user, products: products});
            });
        }
    });
});

productRouter.post('/addtask', function(req, res) {
    console.log(req.body.id,"addtask");
    Product.findByIdAndUpdate(
        req.body.id,
        {$push: { 'task': {  task_name: req.body.taskname } } },
        function (err, model) {
            if (err) {
                console.log(err,"error");
                return res.status(500).send({success: false, msg: 'databswr Error.'});
            }
            else {
                Product.find({}, function (err, products) {
                    if (err) throw err;
                    console.log(products,"products");
                    return res.json({success: true, authorized: true, user: req.user, products: products});
                });
            }
        });
});

productRouter.post('/edittask', function(req, res) {
    console.log(req.body.id,"edittask");
    Product.update({"_id": req.body.id, "task.task_name": req.body.task_id},
        {$set: {"task.$.task_name": req.body.editname}},function (err, model) {
        if (err) {
            console.log(err,"error");
            return res.status(500).send({success: false, msg: 'databswr Error.'});
        }
        else {
            Product.find({}, function (err, products) {
                if (err) throw err;
                console.log(products,"products");
                return res.json({success: true, authorized: true, user: req.user, products: products});
            });
        }
    });
});

productRouter.post('/deletetask', function(req, res) {
    console.log(req.body.id);
    Product.findByIdAndUpdate(
        req.body.id,
        {$pull: { 'task': {  task_name: req.body.taskname } } },
        function (err, model) {
            if (err) {
                console.log(err);
                return res.status(500).send({success: false, msg: 'databswr Error.'});
            }
            else {
                Product.find({}, function (err, products) {
                    if (err) throw err;
                    console.log(products,"products");
                    return res.json({success: true, authorized: true, user: req.user, products: products});
                });
            }
        });
});

productRouter.post('/addsubtask', function(req, res) {
    console.log(req.body.id,"addsubtask");
    Product.update({"_id": req.body.id, "task._id": req.body.taskname},
        {$push: {"task.$.subtask":{subtask_name: req.body.subtaskname, subtask_type: req.body.subtasktype, subtask_option:req.body.subtaskoption }}},{upsert: true},function (err, model) {
            if (err) {
                console.log(err,"error");
                return res.status(500).send({success: false, msg: 'databswr Error.'});
            }
            else {
                Product.find({}, function (err, products) {
                    if (err) throw err;
                    console.log(products,"products");
                    return res.json({success: true, authorized: true, user: req.user, products: products});
                });
            }
        });
});

productRouter.post('/deletesubtask', function(req, res) {
    console.log(req.body.id,"deletesubtask");
    Product.update({"_id": req.body.id, "task._id": req.body.taskname},
        {$pull: {"task.$.subtask":{subtask_name: req.body.subtaskname}}},function (err, model) {
            if (err) {
                console.log(err,"error");
                return res.status(500).send({success: false, msg: 'databswr Error.'});
            }
            else {
                Product.find({}, function (err, products) {
                    if (err) throw err;
                    console.log(products,"products");
                    return res.json({success: true, authorized: true, user: req.user, products: products});
                });
            }
        });
});
productRouter.post('/editsubtask', function(req, res) {
    console.log(req.body.id,req.body.taskname,req.body.subtaskname,"editsubtask");
    Product.findById( req.body.id)
        .then(products =>{
            console.log(products);
            for(let i = 0; i<products.task.length; i++){
                console.log( products.task[i]._id.toString() ===req.body.taskname);
                if(products.task[i]._id.toString() === req.body.taskname){

                    let subtasks = products.task[i].subtask;
                    console.log(subtasks);
                    for(let j = 0; j<subtasks.length; j++){
                        if(subtasks[j]._id.toString() === req.body.subtaskname){
                            console.log("i", i);
                            console.log("j", j);
                            let data = {};
                            data["task." + i + ".subtask." + j + ".subtask_name"] = req.body.editname;
                            data["task." + i + ".subtask." + j + ".subtask_type"] =  req.body.edittype;
                            data["task." + i + ".subtask." + j + ".subtask_option"] = req.body.editoption;
                            //data["operations." + i + ".parameters." + j + ".description"] = updatedescription
                            //data["operations." + i + ".parameters." + j + ".value"] = updatevalue
                            console.log(data);
                            Product.update({
                                "_id": req.body.id
                            },{
                                $set: data
                            })
                                .then(function (resp) {
                                    Product.find({}, function (err, products) {
                                        if (err) throw err;
                                        console.log(products,"products");
                                        console.log(resp,"resp");
                                        return res.json({success: true, authorized: true, user: req.user, products: products});
                                    });
                                }).catch(function (err) {
                                console.log(err,"error");
                                return res.status(500).send({success: false, msg: 'databswr Error.'});
                            });
                        }
                    }
                }
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
module.exports = productRouter;