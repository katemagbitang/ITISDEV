
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

        db.findOne(userModel, {username : username}, '', function(result){
            if(result != null) { // if username EXISTS in the db
                if (username == result.username){
                    bcrypt.compare(password, result.password, function(err, equal) {
                        if(equal){ // correct password

                            var userUpdate = {
                                _id: result._id,
                                username: result.username,
                                email: result.email,
                                password: result.password,
                                firstName: result.firstName,
                                lastName: result.lastName,
                                userType: result.userType,
                                lastLogin: Date.now()
                            }

                            db.updateOne(userModel, {username : username}, userUpdate);

                            req.session.username = result.username;
                            req.session.userType = result.userType;
                            res.redirect("/"); //success, then redirects to home
                        }
                        else { // wrong password
                            res.render("login", {err:"Username and password does not match."});
                        }
                    })
                }
            }else{//if username DOES NOT EXIST in the db
                res.render("login", {err:"Username and password does not match."});
            }
        });

    },
    postSignup: function(req,res){
        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;
        var fName = req.body.fname;
        var lName = req.body.lname;
        var userType = 'Regular';

        console.log("ENTER");
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

        //destroys current session
        req.session.destroy(function(err) {

            if(err) throw err;
            /*
                redirects the client to `/profile` using HTTP GET,
                defined in `../routes/routes.js`
            */
            res.redirect('/');
        });
            
    },

    getUsername: function (req, res) {
        var username = req.query.username;

        db.findOne(userModel, {username : username}, 'username', function(result){
            if(result != null) { // if username EXISTS in the db
                res.send(result);
                console.log("not null: "+result);
            }else
                res.send(" null: "+result);

        });
    },

    getEmail: function (req, res) {
        var email = req.query.email;

        db.findOne(userModel, {email : email}, 'email', function(result){
            if(result != null) { // if email EXISTS in the db
                res.send(result);
                console.log(result);
            }else
                res.send(" null: "+result);
        });
    },

    getProfile: function(req,res) {

        var username = req.session.username;
        
        userModel.findOne({username: username}, function(err, userResult) {
            if (userResult != null) {
                var firstName = userResult.firstName;
                var lastName = userResult.lastName;
                var email = userResult.email;
                var password = userResult.password;

                console.log(firstName + " " + lastName);
                console.log("Email: " + email);
                console.log("Password: " + password);

                res.render("editprofile", {
                    username: username,
                    firstName: firstName,
                    lastName: lastName,
                    email: email
                });
            }
        });
    }, 

    postEditProfile: function(req,res) {
        var username = req.body.username;
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var email = req.body.email;
        var password = req.body.password;
        var cpassword = req.body.cpassword;

        //Checks if input fields are empty and gives default input
        userModel.findOne({username: username}, function (err, userResult) {
            if (userResult != null) {
                var defaultfirst = userResult.firstName;
                var defaultlast = userResult.lastName;
                var defaultemail = userResult.email;

                if (firstName == "") {
                    firstName = defaultfirst;
                }

                if (lastName == "") {
                    lastName = defaultlast;
                }
                
                if (email == "") {
                    email = defaultemail;
                }
            }
        });

        // User wants to change the password
        if (password != "" && cpassword != "") {
            let hash = bcrypt.hashSync(password, saltRounds);
            console.log("Hash: " + hash);

            if(bcrypt.compareSync(cpassword, hash)) {
                userModel.findOneAndUpdate({username: username}, {firstName: firstName, lastName: lastName, email: email, password: hash}, null, function (err, docs) { 
                    if (err){ 
                        console.log(err);
                    }
                    else {
                        console.log("success");
                        res.render("editprofile", {
                            save_success: "Edit is saved successfully!",
                            username: username,
                            firstName: firstName,
                            lastName: lastName,
                            email: email
                        });
                    }
                });
            } else {
                //Password does not match
                res.render("editprofile", {pError: "Confirm Password does not match Password."});
            }
        } //Only password or confirm password has a input
        else if ((password != "" && cpassword == "") || (password == "" && cpassword != "")){
            res.render("editprofile", {
                username: username,
                firstName: firstName,
                lastName: lastName,
                email: email,
                passError: "Input both password and confirm password to save changes"
            });
        } //No input for both password and confirm pasword
        else {
            userModel.findOneAndUpdate({username: username}, {firstName: firstName, lastName: lastName, email: email}, null, function (err, docs) { 
                if (err){ 
                    console.log(err);
                }
                else {
                    console.log("success");
                    res.render("editprofile", {
                        save_success: "Edit is saved successfully!",
                        username: username,
                        firstName: firstName,
                        lastName: lastName,
                        email: email
                    });
                }
            });
        }
    }
}

module.exports = userController;
