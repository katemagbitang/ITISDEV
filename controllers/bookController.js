const db = require('../model/db.js');
const assert = require('assert');
const authorModel = require('../model/authorModel.js');
// const bookAuthorsModel = require('../model/bookAuthorsModel.js');
const booksModel = require('../model/booksModel.js');
const bookVersionsModel = require('../model/bookVersionsModel.js');
const ObjectId = require('mongodb').ObjectID;
const mongoose = require('mongoose');
const { version } = require('os');
const url = 'mongodb://localhost:27017/chapterone';

const bookController = {
    getBook: function(req, res){

        var bookList = []; // stores all info for the listing

        //vars need for rendering: bookCover, title, aName, sellingPrice, 
            //      from versionsresult:  bookCover, sellingPrice, **book_ID
            //      from booksresult: title, author(contains _id of authors)
            //      from authorsresult: aName
        bookVersionsModel.find({}, function (err, versionsresult) {

            if(versionsresult!=null){
                //the process runs for each versionresult. 
                versionsresult.forEach(function(v, err){

                    //stores needed variables from the bookVersionsModel
                    var book_ID = v.book_ID;
                    var sellingPrice = v.sellingPrice;
                    var bookCover = v.bookCover;
                            
                    // find book with the same book_id as the bookversions
                    booksModel.findOne({book_ID: book_ID}, function (err, booksresult) {
                        if(booksresult != null){ 
                            // stores needed variables from the booksModel
                            var authorsID = booksresult.author;
                            var title = booksresult.title;

                            authorModel.find({_id: authorsID}, 'aName', function (err, authorsresult) {

                                var aName = []; //because there can be multiple authors
                                authorsresult.forEach(function(authors, err){
                                    aName.push(authors.aName);
                                })

                                //encapsulates all needed variables into 1 object called booklisting
                                var booklisting = {
                                    title: title,
                                    sellingPrice: sellingPrice,
                                    aName:aName,
                                    bookCover: bookCover
                                }
                                // console.log(booklisting);
                                //adds each booklisting into the bookList array || the bookList array contains all info needed per listing
                                bookList.push(booklisting);
                            })  
                        }
                    });
                })
            }

            //renders the page
            res.render("productpage",{
                bookList: bookList
            });
        });

    },
    getBookByCategory: function(req, res){
        var category = req.params.category;

        var bookList = []; // stores all info for the listing

        //vars need for rendering: bookCover, title, aName, sellingPrice, 
            //      from versionsresult:  bookCover, sellingPrice, **book_ID
            //      from booksresult: title, author(contains _id of authors)
            //      from authorsresult: aName
        bookVersionsModel.find({}, function (err, versionsresult) {

            if(versionsresult!=null){
                //the process runs for each versionresult. 
                versionsresult.forEach(function(v, err){

                    //stores needed variables from the bookVersionsModel
                    var book_ID = v.book_ID;
                    var sellingPrice = v.sellingPrice;
                    var bookCover = v.bookCover;
                            
                    // find book with the same book_id as the bookversions
                    booksModel.findOne({book_ID: book_ID, category: category}, function (err, booksresult) {
                        if(booksresult != null){ 
                            // stores needed variables from the booksModel
                            var authorsID = booksresult.author;
                            var title = booksresult.title;

                            authorModel.find({_id: authorsID}, 'aName', function (err, authorsresult) {

                                var aName = []; //because there can be multiple authors
                                authorsresult.forEach(function(authors, err){
                                    aName.push(authors.aName);
                                })

                                //encapsulates all needed variables into 1 object called booklisting
                                var booklisting = {
                                    title: title,
                                    sellingPrice: sellingPrice,
                                    aName:aName,
                                    bookCover: bookCover
                                }
                                // console.log(booklisting);
                                //adds each booklisting into the bookList array || the bookList array contains all info needed per listing
                                bookList.push(booklisting);
                            })  
                        }
                    });
                })
            }

            //renders the page
            res.render("productpage",{
                bookList: bookList
            });
        });

    }


}

module.exports = bookController;
