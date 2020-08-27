
const db = require('../model/db.js');
// const mongodb = require('../model/mongodb.js');

const userModel = require('../model/userModel.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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

        db.findOne(userModel, {username : username}, 'username password userType', function(result){

            console.log(result);
            // console.log(result.username+ result.password);
        
            if(result != null) {

                if (username == result.username){
                    console.log("username exists");


                    bcrypt.compare(password, result.password, function(err, equal) {
                        if(equal){

                            req.session.username = result.username;
                            req.session.userType = result.userType;
                            console.log("password correct");
        
                        }
                        else {
                            console.log("password INcorrect");
                        }
                    
                    })

                }else{
                    //if username input is not in the db
                        console.log("username does not exist");
                }

            }else{
                //if username input is not in the db
                console.log("null siya");
            }

            res.redirect("/");
        });


    },
    postSignup: function(req,res){
        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;
        var fName = req.body.fname;
        var lName = req.body.lname;
        var userType = 'Regular';

        bcrypt.hash(password, saltRounds, function(err, hash) {

            let user = userModel.findOne({ email: email });
            if (!user) {
                // return res.render('error')
                return res.status(400).send('That user already exists!');
            }

            user = new userModel({
                username: username,
                email: email,
                password: hash,
                firstName:fName,
                lastName: lName,
                userType: userType

            });
            user.save();
            console.log(user);

            res.redirect('/login');
        
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