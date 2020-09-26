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
        if (req.session.userType != "Admin") {
            var username = req.session.username;

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
                    simpleitems = cartItemsResult.items;
                    // console.log("cartItemsResult: " + simpleitems);
                    var bookVersionTry = [];
                    var grandtotal = 0; 
                    
                    if (simpleitems.length === 0) {res.render("cart",{});} else {
                    simpleitems.forEach(function(simpleitem, err){

                        var quantity = simpleitem.quantity;

                        // console.log("simpleitem.bookVersion :  " + simpleitem.bookVersion);
                        bookVersionsModel.findOne({bookVersion_ID: simpleitem.bookVersion}, function (err, versionsresult) {
                            if (versionsresult != null) {
                                var bookVersion_ID = versionsresult.bookVersion_ID;
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
                                                });
                                            }


                                            var cartitem = {
                                                bookVersion_ID: bookVersion_ID,
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

                                                // console.log("cartItemsList: "+ JSON.stringify(cartItemsList, null, ' '));
                                                res.render("cart",{
                                                    cartItemsList: cartItemsList,
                                                    grandtotal: grandtotal.toFixed(2)
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    });
                }}else{
                    res.render("cart",{});

                }    
            });
        }else {
            console.log("unauthorized");
            res.render("errorpage", {});
        }
    },

    postCheckout: function (req, res){
        if (req.session.userType != "Admin") {
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

                // creates the order object with reference to billingaddress
                var billingAddress_ID = billingAddress.billingAddress_ID;
                var order = {
                    order_ID: new ObjectId(),
                    username: username,
                    status: "Pending",
                    billingAddress_ID: ObjectId(billingAddress_ID),
                    order_date: new Date() 
                }

                mongodb.insertOne("orders", order);

                // 
                var orderItems = {
                    OrderItems_ID: new ObjectId(),
                    order_ID: order.order_ID,
                    CartItems_ID: CartItems_ID
                }
                mongodb.insertOne("orderitems", orderItems);

                // console.log("activeCartItems: " + activeCartItems);
                // console.log("activeCartItems.items: " + activeCartItems.items);

                var count = 0;
                activeCartItems.items.forEach(function(v, err){
                    // console.log("\n\nactiveCartItems.items.bookVersion: " + v.bookVersion);
                    // console.log("activeCartItems.items.quantity: " + v.quantity);

                    bookVersionsModel.findOne({bookVersion_ID:v.bookVersion}, function(err, result){
                        var originalQuantity = result.quantity;
                        var quantity = originalQuantity - v.quantity;
                        bookVersionsModel.updateOne({bookVersion_ID:v.bookVersion}, {$set: {quantity: quantity}}, function(){
                            count++; // so that this will only run after the  activeCartItems.items.forEach is done
                            if(count == activeCartItems.items.length){
                                // updates cart status isActive to false! 
                                cartItemsModel.update({username : username,  isActive: true}, {$set: {isActive: false}}, function(){
                                    res.render('cart', {
                                        msg: `Your cart was successfully checked out. Thank you! `
                                    });
                                });
                            }


                        });
                    });
                });
            });
        }else {
            console.log("unauthorized");
            res.render("errorpage", {});
        }
    },

    postAddToCart: function(req, res){
        var username = req.session.username;
        var bookVersion_ID = req.params.bookVersion_ID;
        var quantity = req.body.quantity;

        if(quantity == null) {
            quantity = 1; //default quantity is 1, for the add to cart from browse and search results
        }
        console.log("Book to be Added: " + bookVersion_ID);
        console.log("Quantity: " + quantity);
        
        cartItemsModel.findOne({username: username, isActive: true}, function(err, cartResult){
            // console.log("\n\ncartResult: " + cartResult);
            //If there is an existing Active cart si username
            if(cartResult != null){
                //push the the bookVersion and wuiantity to the item array of the cartItem

                var item = {
                    bookVersion: ObjectId(bookVersion_ID),
                    quantity: parseInt(quantity)
                }

                //if may laman si active cart, push the item along with existing list of items
                if(cartResult.items.length !=0){
                    count = 0;
                    alreadyinside = false;
                    cartResult.items.forEach(function(v, err){

                        //checks if meron nang same item in the cart, if true increment the qunatity nalang
                        if(v.bookVersion == bookVersion_ID){
                            v.quantity += parseInt(quantity);
                            alreadyinside = true;
                        }

                        count++;
                        if(count == cartResult.items.length ){
                            if(alreadyinside == false){
                                //if the item is not in the cart yet, push new item
                                cartResult.items.push(item);
                            }

                            console.log(cartResult.items);
                            cartItemsModel.updateOne({username: username, isActive: true}, {$set: {items: cartResult.items}}, function(){
                                res.redirect("/cart");
                            });
                        }
                    });
                }
                //if walang laman si active cart, just push the item
                else{
                    cartResult.items.push(item);
                    cartItemsModel.updateOne({username: username, isActive: true}, {$set: {items: cartResult.items}}, function(){
                        res.redirect("/cart");
                    });

                }


            }
            //else if Walang active cart si user
            else{

                // create a new cart with isActive = true then add the necessary deets

                var cart = new cartItemsModel({
                    CartItems_ID : new ObjectId(),
                    username:  username,
                    items : [
                        {
                            bookVersion: ObjectId(bookVersion_ID),
                            quantity:  parseInt(quantity)
                        }
                    ],
                    isActive: true
                });

                cart.save();

                res.redirect("/cart");
                
            }
        });
    },

    // this sends the number of individual items in the cart  ((quantity doesnt matter))
    getCartItemsCount: function(req, res){

        var username = req.session.username;

        cartItemsModel.findOne({username: username, isActive: true}, function(err, cartItemsResult){
            if(cartItemsResult){
                var CartItemsCount = cartItemsResult.items.length;
                res.send(CartItemsCount.toString());
            }else{
                res.send("0");
            }
        });
    },
    
    //update the database about the removed books
    postRemoveBook: function(req, res) {
        console.log("Removing book from cart");

        var username = req.session.username;
        var parambookVersion_ID = req.params.bookVersion_ID;
        console.log("book to be removed: " + parambookVersion_ID);
        var bookList = [];

        cartItemsModel.findOne({username: username, isActive: true}, function(err, cartItemsResult) {
            if (cartItemsResult != null) {
                var cartlist = cartItemsResult.items;
                console.log("Cart List: " + cartlist);

                cartlist.forEach(function(bookitem, err) {
                    if (bookitem.bookVersion == parambookVersion_ID) {
                        console.log("Found");
                    }
                    else {

                        bookList.push(bookitem);
                        console.log("Book List: " + bookitem);
                    }
                });
            }
            console.log("BookList Items: " + bookList);

            cartItemsModel.updateOne({username: username, isActive: true}, {$set: {items: bookList}}, function() {
                res.redirect("/cart");
            });
        });
    }

}

module.exports = cartController;
