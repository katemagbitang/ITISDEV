const db = require('../model/db.js');
const authorModel = require('../model/authorModel.js');
const bookAuthorsModel = require('../model/bookAuthorsModel.js');
const booksModel = require('../model/booksModel.js');
const bookVersionsModel = require('../model/bookVersionsModel.js');
const ObjectId = require('mongodb').ObjectID;

const bookController = {
    getBook: function(req, res){
        var books = []; 
        //how to retrieve books
        res.render("productpage",{
            bookList: books
        });
    }
}

module.exports = bookController;