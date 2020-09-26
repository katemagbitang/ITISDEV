// const db = require('../model/db.js');
const ObjectId = require('mongodb').ObjectID;
const ordersModel = require('../model/ordersModel.js');
const orderItemsModel = require('../model/orderItemsModel.js');
const bookVersionsModel = require('../model/bookVersionsModel.js');
const booksModel = require('../model/booksModel.js');
const authorModel = require('../model/authorModel.js');
const cartItemsModel = require('../model/cartItemsModel.js');
const paymentModel = require('../model/paymentModel.js');
const billingAddressModel = require('../model/billingAddressModel.js');

const MongoClient = require('mongodb').MongoClient
const myurl = 'mongodb://localhost:27017/chapterone';



// for image upload
const path = require('path');
const multer = require('multer');


//Set Storage Engine
const storage = multer.diskStorage({
    destination: './public/img',
    filename: function( req, file, callback){
        callback(null, filename =  file.fieldname + '-' + Date.now() +  path.extname(file.originalname));
    }
});

//init upload 
const upload = multer({
    storage: storage,
    fileFilter: function(req, file, callback){
        checkFileType(file, callback);
    }
}).single('myImage');

// check file type
function checkFileType(file , callback){
    // allowed extensions
    const filetypes = /jpeg|jpg|png/;
    // check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    //check mimetype
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
        return callback(null, true);
    }else{
        callback("Error: Images only");
    }
}



function renderOrder(res, view, orders, userType){
    if(userType == "Regular"){
        if(view == "Pending"){
            res.render("userOrdersToPay",{orders: orders});
        }else if(view == "Processing"){
            res.render("userOrdersPaymentProcessing",{orders: orders});
        }else if (view == "Confirmed"){
            res.render("userOrdersConfirmed",{orders: orders});
        }else if ( view == "Cancelled"){
            res.render("userOrdersCancelled",{orders: orders});
        }
    }else if(userType == "Admin"){
        if(view == "Pending"){
            res.render("adminOrdersToPay",{orders: orders});
        }else if(view == "Processing"){
            res.render("adminOrdersPaymentProcessing",{orders: orders});
        }else if (view == "Confirmed"){
            res.render("adminOrdersConfirmed",{orders: orders});
        }else if ( view == "Cancelled"){
            res.render("adminOrdersCancelled",{orders: orders});
        }
    }
}





const orderController = {
    getOrders: function(req,res){
        res.redirect("/Orders/Pending");
    },
    getOrdersByStatus: function(req, res){
        var view = req.params.view;
        var username = req.session.username;

        

        
        //FOR REGULAR USER
        if(req.session.userType == "Regular"){
            ordersModel.find({username : username, status: view}, function(err, ordersModelResult){

                // console.log(ordersModelResult.length);
                var orders = [];
               
                
                if(ordersModelResult.length != 0){
                    
                    var ordersmodelcount = 0;
                    ordersModelResult.forEach(function(omr, err){
                        var order_ID = omr.order_ID;
                        var status = omr.status;
                        var billingAddress_ID = omr.billingAddress_ID;
                        var itemslist = [];
                        var shippingdetails = null; // shipping details per order if any
                        var paymentdetails = null; // shipping details per order if any
                        
                        console.log("order_ID: " + order_ID);
                        // console.log("ordersmodelcount: " + ordersmodelcount);
                        // console.log("lengrth: " + ordersModelResult.length);
                        // console.log("ITERATE            %%%%%%%%%%%%%%%%");
                        // console.log("omr: " + omr);
                        // console.log("omr.billingAddress_ID: " + omr.billingAddress_ID);

                        paymentModel.findOne({order_ID: order_ID}, function(err, paymentResult){
                            // if(paymentResult != null){
                            //     var paymentdetails = paymentResult;
                            // }
                            //gets billing address
                            billingAddressModel.findOne({billingAddress_ID: billingAddress_ID}, function(err, billingAddressResult){
                                if(billingAddressResult != null){
                                    shippingdetails = billingAddressResult;
                                }
                            
                                orderItemsModel.findOne({order_ID: order_ID}, function(err, orderItemsResult){
                                    if(orderItemsResult != null){
                                        var CartItems_ID = orderItemsResult.CartItems_ID; 
                                        // console.log("CartItems_ID: " + CartItems_ID);
                                        cartItemsModel.findOne({CartItems_ID: CartItems_ID}, function (err, cartItemsResult){
                                            
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
                                                                // console.log("push")
                                                                // console.log("items: " + JSON.stringify(itemslist, null, ' '));
                                                                // console.log("1");

                                                                cartitemscount++;
                                                                if(cartitemscount == cartItemsResult.items.length){
                                                                    // console.log("PUSH CART");

                                                                    var totalamount = 0;
                                                                    for(i = 0; i<itemslist.length; i++){
                                                                        // console.log("o");
                                                                        totalamount += itemslist[i].quantity * itemslist[i].price;

                                                                    }

                                                                    totalamount = totalamount.toFixed(2);
                                                                    // console.log(totalamount);
                                                                    
                                                                    if(paymentResult != null){
                                                                        var paymentdetails = paymentResult;
                                                                    }
                                                                    orders.push({
                                                                        order_ID: order_ID,
                                                                        items: itemslist,
                                                                        status: status,
                                                                        totalamount: totalamount,
                                                                        shippingdetails: shippingdetails,
                                                                        paymentdetails: paymentdetails
                                                                    });

                                                                    ordersmodelcount++;
                                                                    if(ordersmodelcount == ordersModelResult.length){
                                                                        
                                                                            console.log("END");
                                                                            console.log("orders:" + JSON.stringify(orders, null, ' '))
                                                                            renderOrder(res, view, orders, req.session.userType);


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
                        })


                    })
                    
                }else{
                    // else if no data
                    console.log("No Data");
                    renderOrder(res, view, orders, req.session.userType);

                }

                
                // res.render("userOrdersToPay",{orders: orders});

            });
        }

        // FOR ADMIN
        else if (req.session.userType == "Admin"){
            ordersModel.find({status: view}, function(err, ordersModelResult){
                var orders = [];
                
                var ordersmodelcount = 0;
                if(ordersModelResult.length != 0){
                    ordersModelResult.forEach(function(omr, err){
                        
                        var order_ID = omr.order_ID;
                        var status = omr.status;
                        var billingAddress_ID = omr.billingAddress_ID;
                        var itemslist = [];
                        var shippingdetails = null; // shipping details per order if any
                        var paymentdetails = null; // shipping details per order if any
                        // console.log("order_ID: " + order_ID);
                        // console.log("ordersmodelcount: " + ordersmodelcount);
                        // console.log("lengrth: " + ordersModelResult.length);
                        
                        paymentModel.findOne({order_ID: order_ID}, function(err, paymentResult){
                            if(paymentResult != null){
                                paymentdetails = paymentResult;
                            }
                            //gets billing address
                            billingAddressModel.findOne({billingAddress_ID: billingAddress_ID}, function(err, billingAddressResult){
                                if(billingAddressResult != null){
                                    shippingdetails = billingAddressResult;
                                    // console.log(shippingdetails)
                                }
                                orderItemsModel.findOne({order_ID: order_ID}, function(err, orderItemsResult){
                                    if(orderItemsResult != null){
                                        var CartItems_ID = orderItemsResult.CartItems_ID; 
                                        // console.log("CartItems_ID: " + CartItems_ID);
                                        cartItemsModel.findOne({CartItems_ID: CartItems_ID}, function (err, cartItemsResult){
                                            
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
                                                                    quantity: parseInt(quantity),
                                                                    title: title,
                                                                    author: authorslist
                                                                }

                                                                itemslist.push(item);
                                                                // console.log("items: " + JSON.stringify(itemslist, null, ' '));

                                                                cartitemscount++;
                                                                if(cartitemscount == cartItemsResult.items.length){
                                                                    // console.log("PUSH CART");

                                                                    var totalamount = 0;
                                                                    for(i = 0; i<itemslist.length; i++){
                                                                        // console.log("o");
                                                                        totalamount += itemslist[i].quantity * itemslist[i].price;

                                                                    }
                                                                    // console.log(totalamount);

                                                                    orders.push({
                                                                        order_ID: order_ID,
                                                                        items: itemslist,
                                                                        status: status,
                                                                        totalamount: totalamount.toFixed(2),
                                                                        shippingdetails: shippingdetails,
                                                                        paymentdetails: paymentdetails
                                                                    });
                                                                    // console.log("ORDERS: " + JSON.stringify(orders, null, ' '));

                                                                }

                                                                ordersmodelcount++;
                                                                if(ordersmodelcount == ordersModelResult.length){

                                                                    
                                                                    renderOrder(res, view, orders, req.session.userType);

                                                                    
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
                        })
                   
                   
                    })
                }else{
                    renderOrder(res, view, orders, req.session.userType);
                }
            });
            
        }

    }
    ,
    postSendPayment: function (req, res){

        var username = req.session.username;
        var order_ID = req.body.SendPaymentOrderNumber;
        var bank_name = req.body.SendPaymentBankName;
        var ref_num = req.body.SendPaymentRefNum;

        var proof_image = req.file.filename; //get filename

        var paymentdetails = new paymentModel({
            payment_ID : ObjectId(),
            username: username,
            order_ID: ObjectId(order_ID),
            bank_name: bank_name,
            ref_num: ref_num,
            proof_image: proof_image
        });

        console.log(paymentdetails);

        paymentdetails.save();

        ordersModel.updateOne({order_ID: ObjectId(order_ID)}, {$set: {status: "Processing"}}, function (err, result){
                
            res.redirect('/Orders/Processing');
            console.log("err update: " + err);
        })

    },
    postConfirmPayment: function(req, res){
        
        var order_ID = req.body.order_ID;
        var confirm_date = new Date();
        console.log(confirm_date);

        ordersModel.updateOne({order_ID: ObjectId(order_ID)}, {$set: {status: "Confirmed", confirm_date: new Date(confirm_date)}}, function(err, result){
            console.log("order_ID: " + order_ID);
            res.send(true)
        })
        
    },
    postRejectPayment: function(req, res){
        
        var order_ID = req.body.order_ID;

        /*
            get the bookversion and quantity from cartItems then add them back to inventory
        */
        orderItemsModel.findOne({order_ID: order_ID}, function(err, orderItemsResult){
            cartItemsModel.findOne({CartItems_ID: orderItemsResult.CartItems_ID}, function(err, cartItemsResult){
                count=0;
                cartItemsResult.items.forEach(function(i, err){
                    bookVersionsModel.findOne({bookVersion_ID: i.bookVersion }, function(err, bookVersionResult){

                        var quantity = bookVersionResult.quantity;
                        quantity += i.quantity;

                        //add back the quantity to the inventory bc cancelled na/rejected payment
                        bookVersionsModel.updateOne({bookVersion_ID: i.bookVersion }, {$set: {quantity: quantity}}, function(){
                            count++
                            if(count == cartItemsResult.items.length ){
                                ordersModel.updateOne({order_ID: ObjectId(order_ID)}, {$set: {status: "Cancelled"}}, function(err, result){
                                    res.send(true)
                                })
                            }
                        })
                    })
                })
            })
        })
    },
    getGenerateSales: function(req,res){
        if (req.session.userType == "Admin") {
            res.render("generatesalesreport",{});
        }
        else {
            console.log("unauthorized");
            res.render("errorpage", {});
        }
    },
    postSalesReport: function(req,res){
        
        var startingdate = req.body.startingdate;
        var sd = new Date (startingdate);
        console.log("Starting date: " + sd);
        var endingdate = req.body.endingdate;
        var ed = new Date (endingdate);
        console.log("Ending date: " + ed);
        var status = "Confirmed";

        var salesList= []; //what is needed: date, customer, product, qty, price
        
        if (req.session.userType == "Admin") {

            
            
            ordersModel.find({status: status}, function(err, ordersResult) {
                console.log("ordersResult: " + ordersResult)
                if (ordersResult != null) {

                    
                    ordersResultCount = 0; // count orders, used so that it only renders when all orders are pushed na
                    ordersResult.forEach(function(result, err) {

                        var order_ID = result.order_ID;
                        var itemlist = [];
                        var confirm_date = result.confirm_date; //date is here

                        if (confirm_date >= sd && confirm_date <= ed) {
                            // console.log("Confirm Date: " + confirm_date + " is included.");

                            orderItemsModel.findOne({order_ID: order_ID}, function(err, itemsResult) {

                                
                                if (itemsResult != null) {
                                    var CartItems_ID = itemsResult.CartItems_ID;
                                    // console.log("Cart Items ID: " + CartItems_ID);

                                    cartItemsModel.findOne({CartItems_ID: CartItems_ID}, function(err, cartItemsResult) {
                                        var customer = cartItemsResult.username; // customer is here

                                        var itemsCount = 0; // used in if,, inside forEach
                                        cartItemsResult.items.forEach(function(items, err){
                                            var quantity = parseInt(items.quantity); // qty is here

                                            bookVersionsModel.findOne({bookVersion_ID : items.bookVersion}, function (err, bookVersionResult) {
                                                if (bookVersionResult) {
                                                    var sellingPrice = parseInt(bookVersionResult.sellingPrice); //price is here
                                                    //var priceBought = bookVersionResult.priceBought;
                                                    var book_ID = bookVersionResult.book_ID;
                                                    //console.log("Price Bought: " + priceBought);

                                                    booksModel.findOne({book_ID: book_ID}, function(err, booksModelResult) {
                                                        var title = booksModelResult.title; //product is here

                                                        var item = {
                                                            title: title,
                                                            sellingPrice: sellingPrice,
                                                            subtotal: sellingPrice*quantity,
                                                            //priceBought: priceBought,
                                                            quantity: quantity
                                                        }

                                                        itemlist.push(item);
                                                        
                                                        itemsCount++;
                                                        if(itemsCount == cartItemsResult.items.length){
                                                            
                                                            var sale = {
                                                                confirm_date: confirm_date.toDateString(),
                                                                customer: customer,
                                                                itemlist: itemlist
                                                            }
                                                            salesList.push(sale);
                                                        }

                                                        ordersResultCount++; //
                                                        if(ordersResultCount == ordersResult.length){

                                                            console.log("salesList: " + JSON.stringify(salesList, null, ' '))
                                                            res.render("salesreport",{
                                                                startingdate: startingdate,
                                                                endingdate: endingdate,
                                                                salesList: salesList
                                                            });
                                                        }

                                                    });
                                                }
                                            });
                                        });
                                    });
                                }
                            });
                        }else{
                            ordersResultCount++; //
                            if(ordersResultCount == ordersResult.length){

                                console.log("salesList: " + JSON.stringify(salesList, null, ' '))
                                res.render("salesreport",{
                                    startingdate: startingdate,
                                    endingdate: endingdate,
                                    salesList: salesList
                                });
                            }


                        }
                    });
    
                }

            });
        }
        else {
            console.log("unauthorized");
            res.render("errorpage", {});
        }
    }

}

module.exports = orderController;
