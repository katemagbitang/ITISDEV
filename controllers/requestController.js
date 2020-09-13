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

        requestModel.find({}, function(err, requestModelResult){

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

            console.log(requests);
        
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
    }


}

module.exports = requestController;