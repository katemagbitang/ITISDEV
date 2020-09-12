
const db = require('../model/db.js');
const dummyModel = require('../model/dummyModel.js');

const controller ={
    getIndex: function(req,res){
        res.render("index", {});
    },
    getHome: function(req,res){
        res.render("home",{});
    },

    //gets current session's userType. useful for validating user permissions
    getSession: function(req, res){
        
        if(req.session.userType != null) // logged in, either Regular or Admin
            res.json({userType:req.session.userType});
        else // if noone is logged in
            res.json({userType:"Visitor"});
    },
    getDummyUpload: function(req, res){
        res.render("dummyupload");
    },
    postDummyUpload: function(req, res){
        

        var filepath = '../img/' + filename;
        console.log(filepath);
        
        var dummy = new dummyModel({
            image: filepath
        })

        dummy.save();

        res.render("dummyupload");
    }

}

module.exports = controller;