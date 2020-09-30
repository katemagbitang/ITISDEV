const db = require('../model/db.js');
const assert = require('assert');
const requestModel = require('../model/requestModel.js');
const fulfillmentModel = require('../model/fulfillmentModel.js');
const notifModel = require('../model/notifModel.js');
const cartItemsModel = require('../model/cartItemsModel.js');
const userModel = require('../model/userModel.js');
const ObjectId = require('mongodb').ObjectID;
const mongoose = require('mongoose');


/*
    this function computes for the differnce in days between 2 dates
*/
function daysDifference(date1, date2){

    //computes for the difference in days between the date_requested and current_date
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    var days = Math.round(Math.abs((date1 - date2) / oneDay ))  ; 

    return days;

}

/*
    This function computes for the priority rating based on our algorithm in the proposal
        @params     maxPrice            number
        @params     date_requested      Date
        @params     isUrgent            String      

        @returns    totalrating         number
*/
function computePriorityRating(maxPrice, date_requested, isUrgent){
    // console.log(maxPrice+ date_requested, isUrgent);

    var base = 0.01;
    var urgent = 0.0;
    var pricerating = 0.0;
    var timerating = 0.0;
    var totalrating = 0.0 ;

    var current_date =  new Date(); // sets current date

    if(isUrgent == "Yes")
        urgent = 0.02;

    // computes for the price rating
    if(maxPrice > 2000){
        pricerating = 0.025;
        maxPrice -= 2000;
        pricerating += Math.floor((maxPrice/500))*0.007;
    }else if(maxPrice > 1000){
        pricerating = 0.01;
        maxPrice -= 1000;
        pricerating += Math.floor((maxPrice/200))*0.003;
    }else if(maxPrice<= 1000){
        pricerating = Math.floor((maxPrice/100))*0.001;

    }
    
    //computes for the difference in days between the date_requested and current_date
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    var days = Math.round(Math.abs((date_requested - current_date) / oneDay ))  ; 


    //computes for timerating
    if(days <= 7){
        timerating = days * 0.02;
    }else if(days > 7){
        timerating = 0.14;
        days -= 7;
        timerating += days * 0.002;
    }



    totalrating = base + urgent + pricerating + timerating;
    totalrating = Math.round(totalrating*1000)/1000; // round to 3 decimal places

    
    // console.log("\n#######################");
    // console.log("maxPrice: " + maxPrice);
    // console.log("date_requested: " + date_requested);
    // console.log("isUrgent: " + isUrgent);

    // console.log("\nBase: "  + base);
    // console.log("Urgent: " + urgent);
    // console.log("pricerating: " + pricerating);
    // console.log("timerating: " + timerating);
    // console.log("totalrating: " + totalrating);

    

    return totalrating;

}

// This function updates the priority rating of all requests
function updatePriorityRating(){

    requestModel.find({}, function(err, requestModelResult){

        requestModelResult.forEach(function(request, err){
            var priority_rating = computePriorityRating(request.maxPrice, request.date_requested, request.isUrgent);
            requestModel.updateOne({request_ID: request.request_ID}, {$set: {priority_rating: priority_rating}}, function(){
                return 1;
            });
        })
    })
}


const requestController = {
    getRequest: function(req,res) {
        if (req.session.userType != "Admin") {
            res.render("requestlist",{});
        } else {
            console.log("unauthorized");
            res.render("errorpage", {});
        }
    },

    getRequestForm: function(req,res) {
        if (req.session.userType != "Admin") {
            res.render("requestform",{});
        } else {
            console.log("unauthorized");
            res.render("errorpage", {});
        }
    },

    getRequestsForRegular: function(req,res){
        if (req.session.userType != "Admin") {
            var status = req.params.status;
            var requests = [];

            //updates the priority ratings first
            updatePriorityRating();

            requestModel.find({status:status, username:req.session.username}, function(err, requestModelResult){

                requestModelResult.forEach(function(request, err){
                    var request = {
                        request_ID : request.request_ID,
                        requester : request.username,
                        book_title : request.book_title,
                        book_author : request.book_author,
                        isUrgent : request.isUrgent,
                        maxPrice : request.maxPrice,
                        quantity : request.quantity, 
                        description : request.description,
                        date_requested : request.date_requested.toDateString(),
                        priority_rating : request.priority_rating,
                        status : request.status
                    }
                    requests.push(request);
                    
                })
            
                if(status == "Cancelled"){
                    res.render("requestlistCancelled",{
                        requests:requests
                    });
        
                }else if (status == "Active"){
                    res.render("requestlist",{
                        requests:requests
                    });
                    
                }else if(status == "Fulfilled"){
                    res.render("requestlistFulfilled",{
                        requests:requests
                    });
                }
                
            });
        } else {
            console.log("unauthorized");
            res.render("errorpage", {});
        }
    },

    getRequestsForAdmin: function (req, res) {
        if (req.session.userType != "Regular") {
            var view = req.params.view;
            var requests = [];
            // var status = "null";

            //updates the priority ratings first
            updatePriorityRating();

            requestModel.find({}, function(err, requestModelResult){

                var requestCount = 0;
                requestModelResult.forEach(function(request, err){

                    var priority_rating = computePriorityRating(request.maxPrice, request.date_requested, request.isUrgent);

                    
                    var request1 = {
                        request_ID : request.request_ID,
                        requester : request.username,
                        book_title : request.book_title,
                        book_author : request.book_author,
                        isUrgent : request.isUrgent,
                        maxPrice : request.maxPrice,
                        quantity : request.quantity, 
                        description : request.description,
                        date_requested : request.date_requested.toDateString(),
                        priority_rating : priority_rating,
                        status : request.status,
                        override: request.override
                    }
                    if(request.status == "Active" && view == "Individual"){
                        requestCount++;
                        requests.push(request1);
                    }else if(request.status == "Active"  && view == "SoonExpiring"){
                        requestCount++;
                        // soon expiring if the request has 2 ignored notifs and is not overridden
                        // we set it to 3 tho bc give time 
                        if(request.ignored_notif_count == 3 && request.override == false){
                            requests.push(request1);
                        }
                            
                    }else if(view == "Fulfilled" && request.status == "Fulfilled"){
                        requestCount++;
                        requests.push(request1);
                    }else if(view == "Cancelled" && request.status == "Cancelled"){
                        requestCount++;
                        requests.push(request1);
                    }else{
                        requestCount++;
                    }

                    if(requestCount == requestModelResult.length){

                        if(view == "Fulfilled"){
                            res.render("adminRequestsListFulfilled",{
                                requestList: requests
                            });
                        }else if (view == "Individual"){
                            res.render("adminRequestsListIndividual",{
                                requestList: requests
                            });
                            
                        }else if(view == "SoonExpiring"){
                            res.render("adminRequestsListSTBC",{
                                requestList: requests
                            });
                        }else if(view == "Cancelled"){
                            res.render("adminRequestsListCancelled",{
                                requestList: requests
                            });
                        }


                    }



                })

            
                
            })
        } else {
            console.log("unauthorized");
            res.render("errorpage", {});
        }
    },

    postOverrideRequest: function(req, res){
        requestModel.updateOne({request_ID: req.params.request_ID}, {$set: {override: true}}, function(){
            res.redirect('back');
        });
    },

    postRequestABook: function(req, res) {
        var request_ID = ObjectId();
        var username = req.session.username;
        var book_title = req.body.title;
        var book_author = req.body.authors;

        if(req.body.isUrgent != undefined)
            var isUrgent = req.body.isUrgent;
        else
            var isUrgent = "No";

        var maxPrice = req.body.price;
        var description = req.body.description;
        var date_requested = new Date();
        var status = "Active";
        var quantity = req.body.quantity;
        var priority_rating = computePriorityRating(maxPrice, date_requested, isUrgent);

        var request = new requestModel({
            request_ID:request_ID,
            username : username,
            book_title : book_title,
            book_author : book_author,
            isUrgent : isUrgent,
            maxPrice : maxPrice,
            description : description,
            date_requested : date_requested,
            status : status,
            quantity: quantity,
            priority_rating : priority_rating
            
        });

        request.save();
        

        // console.log(" New request: "+ JSON.stringify(request, null, ' '));
        res.redirect('/requestlist/Active');
    },

    postFulfillRequest: function(req, res){

        var request_ID = req.body.request_ID;
        var bookVersion_ID = req.body.bookVersion_ID;
        var username = req.body.requester;
        var quantity = req.body.quantity ;


        console.log("request_ID: " + request_ID);
        console.log("bookVersion_ID: " + bookVersion_ID);
        console.log("quantity: " + quantity);

        /*
            1. update request status to "Fulfilled"
            2. create fulfillment (fulfillment_ID, request_ID(fk, bookVersion_ID (NOT fk)))
            3. create notifications (request_ID (fk), date, type [Fulfillment/Update])
            4. add item to users cart
        */

        // 1
        requestModel.updateOne({request_ID: Object(request_ID)}, {$set: {status: "Fulfilled"}}, function(){




            var fulfillment = new fulfillmentModel({
                fulfillment_ID: new ObjectId(),
                request_ID: ObjectId(request_ID),
                bookVersion_ID: ObjectId(bookVersion_ID)

            })
            fulfillment.save();     // 2

            var notification = new notifModel({
                notif_ID: new ObjectId(),
                request_ID : ObjectId(request_ID),
                date : Date.now(),
                type: "Fulfillment",
                username: username
            })
            notification.save();     // 3

            console.log("fulfillment: " + fulfillment);
            console.log("notification: " + notification);

            //  4
            cartItemsModel.findOne({username: username, isActive: true}, function(err, cartResult){

                console.log("4 PASOK")
                // console.log("\n\ncartResult: " + cartResult);
                //If there is an existing Active cart si username
                if(cartResult != null){
                    //push the the bookVersion and wuiantity to the item array of the cartItem
    
                    var item = {
                        bookVersion: ObjectId(bookVersion_ID),
                        quantity: parseInt(quantity)
                    }
    
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
    
                            console.log("cartResult.items: " + cartResult.items);
                            console.log("username: " + username);
                            cartItemsModel.updateOne({username: username, isActive: true}, {$set: {items: cartResult.items}}, function(){
                                // res.redirect("/cart");


                                ///END HERe
                                console.log("ADDED EXISTING");
                                res.send(true);
                            })
                        }
                    })
    
    
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

                    ///END HERe
                    console.log("ADDED NEW CART");
                    res.send(true);
    
                    
                }
            })


        })


    },
    getAutoCancelRequests: function(req, res) { 

        /*
            cancels all qualified request 
            2 qualifications:
                1. a user hasnt logged in in 21days.
                2. 3 notifications has been ignored (we condition it to if 4 ignored_notif_count tho to give time to user to answer the 4th )
        */

        //this is for #1 ! 
        userModel.find({}, function(err, userResult){
            // console.log("userResult: " + userResult)

            userResult.forEach(function(user, err){
                var lastLogin = user.lastLogin;
                var current_date = new Date();
                var username = user.username;

                // console.log("lastLogin: " + lastLogin)

                var days = daysDifference(lastLogin, current_date);
                // console.log("days: " + days);

                if(days >= 21 ){
                    //cancel all requests made by users who hasnt logged in for 30 days or more EXCEPT OVERRIDEN REQUESTS
                    requestModel.updateMany({username: username, override: false}, {$set: {status: "Cancelled"}}, function(err, updateResult){

                    })
                }else{
                    //do nothing
                    // console.log( "OK pa si " + user.username);
                }
            })
        })

        // this is for #2 !
        //cancel all requests with 4 ignored notifs EXCEPT OVERRIDEN REQUESTS
        requestModel.find({ignored_notif_count: 4, override: false}, function (err, requestsResult){
            // console.log("requestsResult: " + requestsResult)

            requestsResult.forEach(function(request, err){
                var request_ID = request.request_ID;

                requestModel.updateOne({request_ID:request_ID} , {$set: {status: "Cancelled"}}, function(){
                    
                })
            })
        })
    },

    postCancelRequest: function(req, res){
        var request_ID = req.body.request_ID;
        console.log("request_ID: " + JSON.stringify(request_ID))

        requestModel.updateOne({request_ID: request_ID}, {$set: {status: "Cancelled"}}, function(){
            res.send(true);
        });

    }
}

module.exports = requestController;
