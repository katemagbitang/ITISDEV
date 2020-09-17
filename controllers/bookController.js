const db = require('../model/db.js');
const assert = require('assert');
const authorModel = require('../model/authorModel.js');
const booksModel = require('../model/booksModel.js');
const bookVersionsModel = require('../model/bookVersionsModel.js');
const ObjectId = require('mongodb').ObjectID;
const mongoose = require('mongoose');
const { version } = require('os');
const { title } = require('process');
const { text } = require('express');
const url = 'mongodb://localhost:27017/chapterone';

const bookController = {
    getBook: function(req, res){

        var bookList = []; // stores all info for the listing

        //vars need for rendering: bookCover, title, aName, sellingPrice, 
            //      from versionsresult:  bookCover, sellingPrice, bookVersion_ID **book_ID
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
                    var bookVersion_ID = v.bookVersion_ID;
                            
                    // find book with the same book_id as the bookversions
                    booksModel.findOne({book_ID: book_ID}, function (err, booksresult) {
                        if(booksresult != null){ 
                            // stores needed variables from the booksModel
                            var authorsID = booksresult.author;
                            var title = booksresult.title;

                            authorModel.find({_id: authorsID},  function (err, authorsresult) {

                                var aName = []; //because there can be multiple authors
                                authorsresult.forEach(function(authors, err){
                                    aName.push(authors.aName);
                                })

                                //encapsulates all needed variables into 1 object called booklisting
                                var booklisting = {
                                    title: title,
                                    sellingPrice: sellingPrice,
                                    aName:aName,
                                    bookCover: bookCover,
                                    bookVersion_ID: bookVersion_ID
                                }
                                // console.log(booklisting);
                                //adds each booklisting into the bookList array || the bookList array contains all info needed per listing
                                bookList.push(booklisting);
                                // console.log(bookList);
                            })  
                        }
                    });
                })
            }
            

            //renders the page
            res.render("productpage",{
                header: 'All Books',
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
                    var bookVersion_ID = v.bookVersion_ID;
                            
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
                                    bookCover: bookCover,
                                    bookVersion_ID: bookVersion_ID
                                }
                                // console.log(booklisting);
                                //adds each booklisting into the bookList array || the bookList array contains all info needed per listing
                                bookList.push(booklisting);
                                 
                            });  
                        }
                    });
                });
            }

            //renders the page
            res.render("productpage",{
                header: category,
                bookList: bookList
            });
        });

    },
    getOneBook: function(req,res) {

        //vars need for rendering: bookCover, title, aName, sellingPrice, publisher, year, quantity, bookSynopsis, quality, quantity, edition, type, category
            //      from versionsresult:  bookCover, sellingPrice, quantity, type, quality, edition **book_ID
            //      from booksresult: title, publisher, year, category, bookSynopsis, author(contains _id of authors)
            //      from authorsresult: aName
        
        var bookVersion_ID = req.params.bookVersion_ID;
        bookVersionsModel.findOne({bookVersion_ID: bookVersion_ID}, function (err, versionsresult) {
            if (versionsresult != null) {
                var book_ID = versionsresult.book_ID;
                var bookCover = versionsresult.bookCover;
                var sellingPrice = versionsresult.sellingPrice;
                var quantity = versionsresult.quantity;
                var type = versionsresult.type;
                var quality = versionsresult.quality;
                var edition = versionsresult.edition;

                booksModel.findOne({book_ID: book_ID}, function (err, booksresult) {
                    if (booksresult != null) {
                        var authorsID = booksresult.author;
                        var title = booksresult.title;
                        var publisher = booksresult.publisher;
                        var year = booksresult.year;
                        var category = booksresult.category;
                        var bookSynopsis = booksresult.bookSynopsis;

                        authorModel.find({_id:authorsID}, function (err, authorsresult) {
                            if (authorsresult != null) {
                                var aName = []; //because there can be multiple authors
                                authorsresult.forEach(function(authors, err){
                                    aName.push(authors.aName);
                                })
                            }
                            
                            res.render("productdetailspage",{
                                title: title,
                                bookCover: bookCover,
                                aName: aName,
                                sellingPrice: sellingPrice,
                                quantity: quantity,
                                bookSynopsis: bookSynopsis,
                                quality: quality,
                                edition: edition,
                                type: type,
                                year: year,
                                publisher: publisher,
                                category: category
                            });
                        });
                    }
                });
            }
        });
    }
    


    
}

module.exports = bookController;
