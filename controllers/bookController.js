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
        var bookList = [];

        //vars need for rendering: bookCover, title, aName, sellingPrice, 
            //      from versionsresult:  bookCover, sellingPrice, **book_ID
            //      from booksresult: title, author(contains _id of authors)
            //      from authorsresult: aName
        bookVersionsModel.find({}, function (err, versionsresult) {

            //the process run for each versionresult. 
            for(i= 0; i<versionsresult.length; i++){
                //stores needed variables from the bookVersionsModel
                var book_ID = versionsresult[i].book_ID;
                var bookCover = versionsresult[i].bookCover;
                var sellingPrice = versionsresult[i].sellingPrice;
                        
                booksModel.findOne({book_ID: book_ID}, function (err, booksresult) {
                    //stores needed variables from the booksModel
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

                        //adds each booklisting into the bookList array
                        //the bookList array contains all info needed per listing
                        bookList.push(booklisting);
                        
                    })  
                });
            }

            //renders the page
            res.render("productpage",{
                bookList: bookList
            });
        });

       
        // //retrieve books
        // booksModel.find({}, function (err, booksresult) {
        //     bookVersionsModel.find({}, function (err, versionsresult) {
        //     authorModel.find({}, function (err, authorsresult) {
        //         // console.log("booksresult: " +JSON.stringify(booksresult));
        //         console.log("booksresult: " +(booksresult));
    
        //         booksresult.forEach(function (doc, err) {
        //         //     // assert.equal(null, err);
        //             books.push(doc);
        //         // }, function() {
        //         //     versionsresult.forEach(function (doc2, err) {
        //         //         // assert.equal(null, err);
        //         //         booksVersions.push(doc2);
        //         //     }, function() {
        //         //         authorsresult.forEach(function (doc3, err) {
        //         //             // assert.equal(null, err);
        //         //             authors.push(doc3);
        //         //         }, function() {
        //                     res.render("productpage", {
        //                         // bookList: books, 
        //                         // booksVersions, 
        //                         // authors
        //                     });
        //         //         });
        //         //     });
        //         // });
    
        //     });
        //     });
        //     });
        

    }
}

module.exports = bookController;
