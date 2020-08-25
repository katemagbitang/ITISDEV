const db = require('./model/db.js');
const mongodb = require('./model/mongodb.js');

// name of the collection (table)
// to perform CRUD (Create, Read, Update, Delete) operations
const authorCollections = 'authorModel';

mongodb.createDatabase();


var author1= {
    a_fName: "Sean",
    a_mName: "C",
    a_lName: "Nieva",
    suffix: "x"
}



mongodb.insertOne(authorCollections, author1);