const mongodb = require('./model/mongodb.js');

// name of the collection (table)
// to perform CRUD (Create, Read, Update, Delete) operations
const authorCollections = 'authors';


var author1node= {
    a_fName: "Sean",
    a_mName: "C",
    a_lName: "Nieva",
    suffix: "x"
}



mongodb.insertOne(authorCollections, author1);