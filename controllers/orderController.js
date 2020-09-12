const db = require('../model/db.js');
const ObjectId = require('mongodb').ObjectID;
const ordersModel = require('../model/ordersModel.js');
const orderItemsModel = require('../model/orderItemsModel.js');
const bookVersionsModel = require('../model/bookVersionsModel.js');
const booksModel = require('../model/booksModel.js');
const authorModel = require('../model/authorModel.js');



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
        */
        ordersModel.find({}, function(result){
            if(result != null){
                console.log(result);

            }
            console.log(result);

            if(view == "Pending"){
                res.render("userOrdersToPay",{});
            }else if(view == "Processing"){
                res.render("userOrdersPaymentProcessing",{});
            }else if (view == "Confirmed"){
                res.render("userOrdersConfirmed",{});
            }else if ( view == "Cancelled"){
                res.render("userOrdersCancelled",{});
            }


        });

        



    }
}

module.exports = orderController;