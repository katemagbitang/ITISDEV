
const db = require('../model/db.js');
const dummyModel = require('../model/dummyModel.js');
const bookVersionsModel = require('../model/bookVersionsModel.js');
const booksModel = require('../model/booksModel.js');

const controller ={
    getIndex: function(req,res){
        res.render("index", {});
    },
    getHome: function(req,res){
        console.log("GETTING HOME");

        var categoryList = []; //what is needed: category
        var bookList = []; //what is needed: bookCover, title, bookVersion_ID

        bookVersionsModel.find({}, function (err, versionsresult) {
            if (versionsresult != null) {
                versionsresult.forEach(function(v, err) {
                    var bookVersion_ID = v.bookVersion_ID;
                    var book_ID = v.book_ID;
                    var bookCover = v.bookCover;

                    booksModel.findOne({book_ID: book_ID}, function(err, booksresult) {
                        if (booksresult != null) {
                            var title = booksresult.title;
                            var category = booksresult.category;

                            var booklisting = {
                                bookVersion_ID: bookVersion_ID,
                                bookCover: bookCover,
                                title: title
                            }

                            bookList.push(booklisting);

                            if (categoryList.includes(category)) {
                                console.log(category +" is already stored.");
                            }
                            else {
                                categoryList.push(category);
                                console.log("Category: " + category);
                            }
                        }
                    });
                });

            }

            //renders page
            res.render("home", {
                bookList: bookList,
                categoryList: categoryList
            });
        });
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
