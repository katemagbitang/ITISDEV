const db = require('./model/db.js');
const mongodb = require('./model/mongodb.js');


const authorCollections = 'authorModel';
const bookAuthorsCollections = 'bookAuthorsModel';
const booksCollections = 'booksModel';
const cartItemsCollections = 'cartItemsModel';
const fulfillmentCollections = 'fulfillmentModel';
const messagesCollections = 'messagesModel';
const notifCollections = 'notifModel';
const orderItemsCollections = 'orderItemsModel';
const ordersCollections = 'ordersModel';
const paymentCollections = 'paymentModel';
const requestCollections = 'requestModel';
const userCollections = 'userModel';


// mongodb.createCollection(authorCollections);
// mongodb.createCollection(bookAuthorsCollections);
// mongodb.createCollection(booksCollections);
// mongodb.createCollection(cartItemsCollections);
// mongodb.createCollection(fulfillmentCollections);
// mongodb.createCollection(messagesCollections);
// mongodb.createCollection(notifCollections);
// mongodb.createCollection(orderItemsCollections);
// mongodb.createCollection(ordersCollections);
// mongodb.createCollection(paymentCollections);
// mongodb.createCollection(requestCollections);
// mongodb.createCollection(userCollections);




var author1= {
    a_fName: "Sean",
    a_mName: "C",
    a_lName: "Nieva",
    suffix: "x"
}
mongodb.insertOne(authorCollections, author1);