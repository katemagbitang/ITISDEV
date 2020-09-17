const db = require('../model/db.js');
const mongodb = require('../model/mongodb.js');
const ObjectId = require('mongodb').ObjectID;
const ordersModel = require('../model/ordersModel.js');
const orderItemsModel = require('../model/orderItemsModel.js');
const bookVersionsModel = require('../model/bookVersionsModel.js');
const booksModel = require('../model/booksModel.js');
const authorModel = require('../model/authorModel.js');
const cartItemsModel = require('../model/cartItemsModel.js');
const paymentModel = require('../model/paymentModel.js');
const billingAddressModel = require('../model/billingAddressModel.js');
const adminController = require('./adminController.js');



const cartController = {
    getCart: function(req,res){

        var username = req.session.username;
        console.log("username: " + username);

        /*
            ##  quantity
            ##  bookCover, price, quality, edition, type
            ##  title
            ##  Subtotal and GrandTotal

            from carITemsModel: items: [bookVersion, quantity]                              
            from versionsresult:  bookCover, sellingPrice,quality, edition, type bookVersion_ID **book_ID         
            from booksresult: title, author(contains _id of authors)                        
            from authorsresult: aName
        */
       var simpleitems = []; // stores the items from the cartItemsResult
       var cartItemsList = []; // stores all data needed for hbs
       
        cartItemsModel.findOne({username:username, isActive: true}, function(err, cartItemsResult){
            if(cartItemsResult != null){
                var cartItemsCount = 0;
                simpleitems = cartItemsResult.items
                console.log("cartItemsResult: " + simpleitems);
                var bookVersionTry = [];
                var grandtotal = 0; 

                simpleitems.forEach(function(simpleitem, err){

                    var quantity = simpleitem.quantity;

                    console.log("simpleitem.bookVersion :  " + simpleitem.bookVersion);
                    bookVersionsModel.findOne({bookVersion_ID: simpleitem.bookVersion}, function (err, versionsresult) {
                        if (versionsresult != null) {
                            var book_ID = versionsresult.book_ID;
                            var bookCover = versionsresult.bookCover;
                            var sellingPrice = versionsresult.sellingPrice;
                            var type = versionsresult.type;
                            var quality = versionsresult.quality;
                            var edition = versionsresult.edition;
                            var subtotal = quantity*sellingPrice;
                            grandtotal += subtotal;
            
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


                                        var cartitem = {
                                            quantity: quantity,
                                            bookCover: bookCover,
                                            quality: quality,
                                            edition: edition,
                                            price: sellingPrice.toFixed(2),
                                            type: type,
                                            title: title,
                                            subtotal: subtotal.toFixed(2)
                                        }

                                        cartItemsList.push(cartitem);
                                        
                                        cartItemsCount++;
                                        if(cartItemsCount == simpleitems.length){

                                            console.log("cartItemsList: "+ JSON.stringify(cartItemsList, null, ' '));
                                            res.render("cart",{
                                                cartItemsList: cartItemsList,
                                                grandtotal: grandtotal
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                })
            }else{
                res.render("cart",{});

            }
           
            
        })




        
    },

    postCheckout: function (req, res){

        console.log("post")
        /*
            1.  find active cart
            2. create billing address
            3.  create order 
                    order_ID
                    username
                    status = "Pending"
            4, create orderItems
                    OrderItems_ID
                    order_ID   (from 2)
                    CartItems_ID    (if active)
            
            5. update cartitems isActive to "No"
        */

        username = req.session.username;
        fullname = req.body.fullname;
        contactNum = req.body.contactNum;
        address = req.body.address;
        city = req.body.city;
        barangay = req.body.barangay;
        zip = req.body.zip;

        cartItemsModel.findOne({username : username,  isActive: true}, function(err, activeCartItems){
            // console.log(activeCartItems)
            CartItems_ID = activeCartItems.CartItems_ID;

            // creates the billingaddress object
            var billingAddress = new billingAddressModel({
                billingAddress_ID: new ObjectId(),
                fullname: fullname,
                contactNum: contactNum,
                address: address,
                city: city,
                barangay: barangay,
                zip: zip
            })
            mongodb.insertOne("billingaddress", billingAddress);

            // creates the billingAddress_ID object with reference to billingaddress
            var billingAddress_ID = billingAddress.billingAddress_ID;
            var order = {
                order_ID: new ObjectId(),
                username: username,
                status: "Pending",
                billingAddress_ID: ObjectId(billingAddress_ID)
            }

            mongodb.insertOne("orders", order);

            // creates the billingAddress_ID object with reference to orders and active cartitems id
            var orderItems = {
                OrderItems_ID: new ObjectId(),
                order_ID: order.order_ID,
                CartItems_ID: CartItems_ID
            }
            mongodb.insertOne("orderitems", orderItems);

            cartItemsModel.update({username : username,  isActive: true}, {$set: {isActive: false}}, function(){
                res.render('cart', {
                    msg: `Your cart was successfully checked out. Thank you! `
                });
    

            });




        })

        
    }

}

module.exports = cartController;