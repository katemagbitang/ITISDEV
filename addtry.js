const db = require('./model/db.js');
const mongodb = require('./model/mongodb.js');
const ObjectId = require('mongodb').ObjectID;


const authorCollections = 'authors';
const userCollections = 'users';
const messageCollections = 'messages';
const messageHistoryCollections = 'messageshistories';



var user = [
    {
        username: "seanxnieva",
        email: "sean@gmail.com",
        password: "$2b$10$DW5ggP/brSWeU1xZzXk2gejAPbF2BGyyFQbkilHbB.6WoEETmCgkm", //"secret"
        firstName: "sean",
        lastName: "nieva",
        userType: "Admin",
    },
    {
        username: "johnsmith",
        email: "john@gmail.com",
        password: "$2b$10$DW5ggP/brSWeU1xZzXk2gejAPbF2BGyyFQbkilHbB.6WoEETmCgkm", // "secret"
        firstName: "john",
        lastName: "smith",
        userType: "Regular",
    },
    {
        username: "bobjohnson",
        email: "bob@gmail.com",
        password: "$2b$10$DW5ggP/brSWeU1xZzXk2gejAPbF2BGyyFQbkilHbB.6WoEETmCgkm", // "secret"
        firstName: "bob",
        lastName: "johnson",
        userType: "Regular",
    },
    {
        username: "willowsmith",
        email: "willow@gmail.com",
        password: "$2b$10$DW5ggP/brSWeU1xZzXk2gejAPbF2BGyyFQbkilHbB.6WoEETmCgkm", // "secret"
        firstName: "willow",
        lastName: "smith",
        userType: "Regular",
    }
]

mongodb.insertMany(userCollections, user);

var messages = [
    { // [0]
        _id : ObjectId(),
        sender: "willowsmith",
        receiver: "seanxnieva",
        message: "Hello, ask ko lang po yung.. jk kaxadskjfga ok test test lorem ipsum",
        date: Date(),
        read: "Read"
    },
    {// [1]
        _id : ObjectId(),
        sender: "seanxnieva",
        receiver: "willowsmith",
        message: "ah bale po ano po ano.. ganito po kase.. ahmm ok",
        date: Date(),
        read: "Read"
    },
    {// [2]
        _id : ObjectId(),
        sender: "willowsmith",
        receiver: "seanxnieva",
        message: "Hello, ask ko lang po yung.. jk kaxadskjfga ok test test lorem ipsum",
        date: Date(),
        read: "Read"
    },
    {// [3]
        _id : ObjectId(),
        sender: "willowsmith",
        receiver: "seanxnieva",
        message: "Hello, ask ko lang po yung.. jk kaxadskjfga ok test test lorem ipsum",
        date: Date(),
        read: "Read"
    },
    {// [4]
        _id : ObjectId(),
        sender: "johnsmith",
        receiver: "seanxnieva",
        message: "Hello, ask ko lang po yung.. jk kaxadskjfga ok test test lorem ipsum",
        date: Date(),
        read: "Read"
    },
    {// [5]
        _id : ObjectId(),
        sender: "seanxnieva",
        receiver: "johnsmith",
        message: "Hello, ask ko lang po yung.. jk kaxadskjfga ok test test lorem ipsum",
        date: Date(),
        read: "Read"
    }

]
mongodb.insertMany(messageCollections, messages);


var messageHistory = [
    {
        messageHistory_ID: ObjectId(),
        user1: "seanxnieva",
        user2: "willowsmith",
        messages: [
            messages[0]._id,
            messages[1]._id,
            messages[2]._id,
            messages[3]._id
        ]
    },
    {
        messageHistory_ID: ObjectId(),
        user1: "johnsmith",
        user2: "seanxnieva",
        messages: [
            messages[4]._id,
            messages[5]._id
        ]
        
    }

]

mongodb.insertMany(messageHistoryCollections, messageHistory);