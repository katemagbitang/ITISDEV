const db = require('../model/db.js');
const assert = require('assert');
const requestModel = require('../model/requestModel.js');
const userModel = require('../model/userModel.js');
const ObjectId = require('mongodb').ObjectID;
const mongoose = require('mongoose');


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
    getRequestsForRegular: function(req,res){

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
                
            }
            
        })
    },

    getRequestsForAdmin: function (req, res) {
        var view = req.params.view;
        var requests = [];
        // var status = "null";

        //updates the priority ratings first
        updatePriorityRating();

        requestModel.find({}, function(err, requestModelResult){

            requestModelResult.forEach(function(request, err){

                var priority_rating = computePriorityRating(request.maxPrice, request.date_requested, request.isUrgent);

                
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
                    priority_rating : priority_rating,
                    status : request.status,
                    override: request.override
                }
                if(request.status != "Cancelled" && request.status != "SoonExpiring" && view == "Individual"){
                    requests.push(request);
                }else if(request.status == "SoonExpiring"  && view == "SoonExpiring"){
                    requests.push(request);
                }else if(view == "Collective"){
                    // enter codes here
                }
            })

            // console.log(requests);
        
            if(view == "Collective"){
                res.render("adminRequestsListCollective",{
                    
                });
    
            }else if (view == "Individual"){
                res.render("adminRequestsListIndividual",{
                    requestList: requests
                });
                
            }else if(view == "SoonExpiring"){
                res.render("adminRequestsListSTBC",{
                    requestList: requests
                });
            }
        })
    },

    postOverrideRequest: function(req, res){
        requestModel.update({request_ID: req.params.request_ID}, {$set: {override: true}}, function(){
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
        res.redirect('back');
    }


}

module.exports = requestController;