const db = require('../model/db.js');
const ObjectId = require('mongodb').ObjectID;
const ordersModel = require('../model/ordersModel.js');
const orderItemsModel = require('../model/orderItemsModel.js');
const bookVersionsModel = require('../model/bookVersionsModel.js');
const booksModel = require('../model/booksModel.js');
const authorModel = require('../model/authorModel.js');
const cartItemsModel = require('../model/cartItemsModel.js');



const orderController = {
    getOrders: function(req,res){
        res.redirect("/Orders/Pending");
    },
    getOrdersByStatus: function(req, res){
        var view = req.params.view;
        var username = req.session.username;
        

        /*
            one ordersmodel: order_ID
            one orderItesmsModel by order_ID:   CartItems_ID []
            one cartItemsModel by CartItems_ID []: isActive, items:[bookVersion, quantity]
            many bookversions by item>bookVersion: 

            orders: [
                {
                    order_ID,
                    items: [{title, author, quality, edition, type, quantity, price}],
                    totalamount
                    status
                }
            ]


        */
        ordersModel.find({username : username, status: view}, function(err, ordersModelResult){
            var orders = [];
            var itemslist = [];
            
            if(ordersModelResult != null){

            
                ordersModelResult.forEach(function(omr, err){
                    var order_ID = omr.order_ID;
                    var status = omr.status;
                    // console.log("order_ID: " + order_ID);
                    // console.log("ordersmodelcount: " + ordersmodelcount);
                    // console.log("lengrth: " + ordersModelResult.length);
                    
                    orderItemsModel.findOne({order_ID: order_ID}, function(err, orderItemsResult){
                        if(orderItemsResult != null){
                            var CartItems_ID = orderItemsResult.CartItems_ID; 
                            // console.log("CartItems_ID: " + CartItems_ID);
                            cartItemsModel.findOne({CartItems_ID: CartItems_ID}, function (err, cartItemsResult){
                                var ordersmodelcount = 0;
                                var cartitemscount = 0;
                                
                                cartItemsResult.items.forEach(function(items, err){
                                    // console.log("items: "+ items);
                                    
                                    var quantity = items.quantity;

                                    bookVersionsModel.findOne({bookVersion_ID : items.bookVersion}, function (err, bookVersionResult){
                                        
                                        if(bookVersionResult){
                                            // console.log("bookVersionResult: " + bookVersionResult);
                                            var quality = bookVersionResult.quality;
                                            var edition = bookVersionResult.edition;
                                            var type = bookVersionResult.type;
                                            var price = bookVersionResult.sellingPrice;

                                            booksModel.findOne({book_ID: bookVersionResult.book_ID}, function(err, booksModelResult){

                                                var title = booksModelResult.title;
                                                var authorsID = booksModelResult.author;

                                                authorModel.find({_id: authorsID}, function(err, authorModelResult){
                                                    // console.log("authorModelResult:"+ authorModelResult);
                                                    var authorslist = [];
                                                    authorModelResult.forEach(function(authors, err){
                                                        authorslist.push(authors.aName);
                                                    })

                                                    var item =  {
                                                        quality: quality,
                                                        edition: edition,
                                                        type: type,
                                                        price : price,
                                                        quantity: quantity,
                                                        title: title,
                                                        author: authorslist
                                                    }

                                                    itemslist.push(item);
                                                    // console.log("items: " + JSON.stringify(itemslist, null, ' '));

                                                    cartitemscount++;
                                                    if(cartitemscount == cartItemsResult.items.length){
                                                        console.log("PUSH CART");

                                                        var totalamount = 0;
                                                        for(i = 0; i<itemslist.length; i++){
                                                            console.log("o");
                                                            totalamount += itemslist[i].quantity * itemslist[i].price;

                                                        }
                                                        console.log(totalamount);

                                                        orders.push({
                                                            order_ID: order_ID,
                                                            items: itemslist,
                                                            status: status,
                                                            totalamount: totalamount
                                                        });
                                                        // console.log("ORDERS: " + orders);

                                                    }

                                                    ordersmodelcount++;
                                                    if(ordersmodelcount == cartItemsResult.items.length){
                                                        // console.log("ORDERS: " + JSON.stringify(orders, null, ' '));
                                                        // console.log(ordersmodelcount);
                                                        // console.log(cartItemsResult.items.length);
                                                        // res.render("userOrdersToPay",{orders: orders});
                                                        if(view == "Pending"){
                                                            res.render("userOrdersToPay",{orders: orders});
                                                        }else if(view == "Processing"){
                                                            res.render("userOrdersPaymentProcessing",{orders: orders});
                                                        }else if (view == "Confirmed"){
                                                            res.render("userOrdersConfirmed",{orders: orders});
                                                        }else if ( view == "Cancelled"){
                                                            res.render("userOrdersCancelled",{orders: orders});
                                                        }
                                                    }

                                                                    



                                                })
                                            })
                                        }
                                    })
                                })
                            })
                        }
                    })
                    
                })

                

                
            }

            


        });

        



    }
}

module.exports = orderController;