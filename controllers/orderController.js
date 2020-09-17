// const db = require('../model/db.js');
const ObjectId = require('mongodb').ObjectID;
const ordersModel = require('../model/ordersModel.js');
const orderItemsModel = require('../model/orderItemsModel.js');
const bookVersionsModel = require('../model/bookVersionsModel.js');
const booksModel = require('../model/booksModel.js');
const authorModel = require('../model/authorModel.js');
const cartItemsModel = require('../model/cartItemsModel.js');
const paymentModel = require('../model/paymentModel.js');

const MongoClient = require('mongodb').MongoClient
const myurl = 'mongodb://localhost:27017/chapterone';


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

                console.log(ordersModelResult.length);
                var orders = [];
               
                
                if(ordersModelResult.length != 0){
                    
                    var ordersmodelcount = 0;
                    ordersModelResult.forEach(function(omr, err){
                        var order_ID = omr.order_ID;
                        var status = omr.status;
                        var itemslist = [];
                        
                        // console.log("order_ID: " + order_ID);
                        // console.log("ordersmodelcount: " + ordersmodelcount);
                        // console.log("lengrth: " + ordersModelResult.length);
                        // console.log("ITERATE            %%%%%%%%%%%%%%%%");
                        
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
                                                            // console.log(totalamount);

                                                            orders.push({
                                                                order_ID: order_ID,
                                                                items: itemslist,
                                                                status: status,
                                                                totalamount: totalamount
                                                            });

                                                        //    console.log("2");
                                                        //    console.log("ORDERS: " + JSON.stringify(orders, null, ' '));
                                                        //    itemslist.splice(0,itemslist.length);

                                                            
                                                            // console.log("ORDERS: " + JSON.stringify(orders, null, ' '));

                                                        }
                                                        
                                                        ordersmodelcount++;
                                                        // console.log("\n ordersmodelcount: " + ordersmodelcount);
                                                        // console.log("ordersModelResult.length: " + ordersModelResult.length);
                                                        console.log("b4 END");
                                                        console.log("ordersmodelcount: " + ordersmodelcount);
                                                        console.log("ordersModelResult.length: " + ordersModelResult.length);
                                                        if(ordersmodelcount == ordersModelResult.length){
                                                            // console.log("ORDERS: " + JSON.stringify(orders, null, ' '));
                                                            // console.log("ordersmodelcount: " + ordersmodelcount);
                                                            // console.log("cartItemsResult.items.length: " + cartItemsResult.items.length);
                                                            // res.render("userOrdersToPay",{orders: orders});
                                                            
                                                                console.log("END");
                                                                renderOrder(res, view, orders, req.session.userType);
                                                            
                                                            
                                                            // res.render("userOrdersToPay",{orders: orders});


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
                        var itemslist = [];
                        // console.log("order_ID: " + order_ID);
                        // console.log("ordersmodelcount: " + ordersmodelcount);
                        // console.log("lengrth: " + ordersModelResult.length);
                        
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
                                                                totalamount: totalamount
                                                            });
                                                            // console.log("ORDERS: " + JSON.stringify(orders, null, ' '));

                                                        }

                                                        ordersmodelcount++;
                                                        if(ordersmodelcount == ordersModelResult.length){
                                                            // console.log("ORDERS: " + JSON.stringify(orders, null, ' '));
                                                            // console.log("ordersmodelcount: " + ordersmodelcount);
                                                            // console.log("cartItemsResult.items.length: " + cartItemsResult.items.length);
                                                            // res.render("userOrdersToPay",{orders: orders});
                                                            
                                                           

                                                            // if (view == "Pending"){
                                                            //     ordersModel.updateOne({order_ID: ObjectId('5f61a01e278b4630c87e77e9'), $set: {status: "Processing"}}, function(){
                                                            //     console.log("UPDATEDDDDDDDDDDDDDDDDDDDDDDDDDDD")
                                                            //     renderOrder(res, view, orders);
                                                            //     })
                                                            // }
                                                            // else
                                                                renderOrder(res, view, orders, req.session.userType);
                                                            
                                                            
                                                            
                                                            // res.render("userOrdersToPay",{orders: orders});


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
        var proof_image = req.file.filename; 

        var paymentdetailsPrint = {
            payment_ID : ObjectId(),
            username: username,
            order_ID: ObjectId(order_ID),
            bank_name: bank_name,
            ref_num: ref_num,
            proof_image: proof_image
        };

        console.log(paymentdetailsPrint);
        var paymentdetails = new paymentModel({
            payment_ID : ObjectId(),
            username: username,
            order_ID: ObjectId(order_ID),
            bank_name: bank_name,
            ref_num: ref_num,
            proof_image: proof_image
        });

        // console.log(paymentDetails)

        paymentdetails.save();

        ordersModel.updateOne({order_ID: ObjectId(order_ID)}, {$set: {status: "Processing"}}, function (err, result){
            res.redirect('/Orders/Processing');
            console.log("err update: " + err);
        })

    }

}

module.exports = orderController;