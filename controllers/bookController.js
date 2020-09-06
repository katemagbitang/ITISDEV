const db = require('../model/db.js');
const assert = require('assert');
const authorModel = require('../model/authorModel.js');
const bookAuthorsModel = require('../model/bookAuthorsModel.js');
const booksModel = require('../model/booksModel.js');
const bookVersionsModel = require('../model/bookVersionsModel.js');
const ObjectId = require('mongodb').ObjectID;

const bookController = {
    getBook: function(req, res){
        var books = [];
        var booksVersions = [];
        var authors = []; 

        //retrieve books
        booksModel.find({}, function (err, booksresult) {
        bookVersionsModel.find({}, function (err, versionsresult) {
        authorModel.find({}, function (err, authorsresult) {
            console.log("booksresult: " +booksresult);

            booksresult.forEach(function (doc, err) {
                assert.equal(null, err);
                books.push(doc);
            }, function() {
                versionsresult.forEach(function (doc2, err) {
                    assert.equal(null, err);
                    booksVersions.push(doc2);
                }, function() {
                    authorsresult.forEach(function (doc3, err) {
                        assert.equal(null, err);
                        authors.push(doc);
                    }, function() {
                        res.render("productpage", {
                            bookList: books, booksVersions, authors
                        });
                    });
                });
            });
        });
        });
        });
    }
}

module.exports = bookController;
