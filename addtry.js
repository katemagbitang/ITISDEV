const db = require('./model/db.js');
const mongodb = require('./model/mongodb.js');


const authorCollections = 'authors';
const userCollections = 'users';




var author1= {
    a_fName: "Sean",
    a_mName: "C",
    a_lName: "Nieva",
    suffix: "x"
}

mongodb.insertOne(authorCollections, author1);

var user = [
    {
        username: "seanxnieva",
        email: "sean@gmail.com",
        password: "secret",
        firstName: "sean",
        lastName: "nieva",
        userType: "Admin",
    },
    {
        username: "johnsmith",
        email: "john@gmail.com",
        password: "secret",
        firstName: "john",
        lastName: "smith",
        userType: "Regular",
    }

]

mongodb.insertMany(userCollections, user);