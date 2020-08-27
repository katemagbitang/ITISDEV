
const db = require('../model/db.js');

const userModel = require('../model/userModel.js');

const userController = {
    getSignUp: function(req,res){
        res.render("signup",{});
    },

    getLogin: function(req,res){
        res.render("login",{});
    },

    postLogin: function(req,res){
        
        var username = req.body.username;
        var password = req.body.password;

        console.log(req.body.username);

        db.findOne(userModel, {username : username}, 'username password', function(){

           console.log("OKAY");


        })


    },

    getLogout: function(req,res){
        res.render("index_loggedout",{});
    },

    getMessage: function(req,res){
        res.render("messages",{});
    }
}

module.exports = userController;