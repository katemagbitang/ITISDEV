const db = require('../model/db.js');
const assert = require('assert');
const authorModel = require('../model/authorModel.js');
const booksModel = require('../model/booksModel.js');
const bookVersionsModel = require('../model/bookVersionsModel.js');
const ObjectId = require('mongodb').ObjectID;

const searchController = {
    postSearch: function(req,res){
        var userinput = req.body.searchtext;
        console.log("Searching for: " + userinput);

        var searchList = [];

        bookVersionsModel.find({}, function (err, versionsresult) {
            if (versionsresult != null) {
                versionsresult.forEach(function(v, err){
                    //stores needed variables from the bookVersionsModel
                    var book_ID = v.book_ID;
                    var sellingPrice = v.sellingPrice;
                    var bookCover = v.bookCover;
                    var bookVersion_ID = v.bookVersion_ID;

                    booksModel.findOne({'book_ID': book_ID, 'title': { '$regex': userinput, '$options': 'i'}}, function (err, booksresult) {
                        if (booksresult != null) {
                            var authorsID = booksresult.author;
                            var title = booksresult.title;

                            authorModel.find({_id: authorsID}, 'aName', function (err, authorsresult) {

                                var aName = []; //because there can be multiple authors
                                authorsresult.forEach(function(authors, err) {
                                    aName.push(authors.aName);
                                });

                                //encapsulates all needed variables into 1 object called booklisting
                                var booklisting = {
                                    title: title,
                                    sellingPrice: sellingPrice,
                                    aName:aName,
                                    bookCover: bookCover,
                                    bookVersion_ID: bookVersion_ID
                                }

                                searchList.push(booklisting);
                            });
                        }
                    });
                });
            }

            //renders the page
            res.render("searchpage",{
                header: "Search Results",
                userinput: userinput,
                searchList: searchList
            });
        });
    },

    postSearchNoRender: function(req,res){
        var userinput = req.body.searchtext;
        console.log("Searching for: " + userinput);

        var searchList = [];

            if(userinput != '' || userinput != null || userinput != undefined){
                bookVersionsModel.find({}, function (err, versionsresult) {
                    if (versionsresult != null) {
                        count = 0;
                        versionsresult.forEach(function(v, err){
                            //stores needed variables from the bookVersionsModel
                            var book_ID = v.book_ID;
                            var sellingPrice = v.sellingPrice;
                            var bookCover = v.bookCover;
                            var bookVersion_ID = v.bookVersion_ID;
                            var quantity = v.quantity;
                            var quality = v.quality;
                            var edition = v.edition;
                            var type = v.type;

                            booksModel.findOne({'book_ID': book_ID, 'title': { '$regex': userinput, '$options': 'i'}}, function (err, booksresult) {
                                if (booksresult != null) {
                                    var authorsID = booksresult.author;
                                    var title = booksresult.title;

                                    authorModel.find({_id: authorsID}, 'aName', function (err, authorsresult) {

                                        var aName = []; //because there can be multiple authors
                                        authorsresult.forEach(function(authors, err) {
                                            aName.push(authors.aName);
                                        });

                                        //encapsulates all needed variables into 1 object called booklisting
                                        var booklisting = {
                                            title: title,
                                            sellingPrice: sellingPrice,
                                            aName:aName,
                                            bookCover: bookCover,
                                            bookVersion_ID: bookVersion_ID,
                                            quantity: quantity,
                                            quality: quality,
                                            edition: edition,
                                            type: type

                                        }

                                        searchList.push(booklisting);

                                        count++;
                                        if(count == versionsresult.length){
                                            console.log("!!!!searchList: " + searchList);
                                            res.send({
                                                searchList: searchList
                                            });

                                        }
                                    });
                                }else{
                                    count++;
                                        if(count == versionsresult.length){
                                            console.log("!!!!searchList: " + searchList);
                                            res.send({
                                                searchList: searchList
                                            });

                                        }

                                }
                            });
                        });
                    }

                    
                });
            }else{
                res.send();
            }




    }
}

module.exports = searchController;