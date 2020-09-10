const db = require('../model/db.js');
const assert = require('assert');
const requestModel = require('../model/requestModel.js');
const userModel = require('../model/userModel.js');
const ObjectId = require('mongodb').ObjectID;
const mongoose = require('mongoose');




const requestController = {
    getRequestsForRegular: function(req,res){

        var status = req.params.status;
        var requests = [];

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

            console.log("requests!!!!!!!!!!!!!!!!" +requests.length);
            console.log("requests!!!!!!!!!!!!!!!!" +requests);
        
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






        



    }
}

module.exports = requestController;