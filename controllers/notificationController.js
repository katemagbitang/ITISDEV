
const { ObjectId } = require('mongodb');
const db = require('../model/db.js');
const notifModel = require('../model/notifModel.js');
const requestModel = require('../model/requestModel.js');





const notificationController ={
    getNotification: function(req,res){

        var username = req.session.username;
        // var notifDate, requestDate, username, aName, title, response;

        var notifs = [];

        notifModel.updateMany({username:username}, {$set: {seen: true}}, function(){
            notifModel.find({username: username}, function(err, notifResults){

                // console.log("notifResults.length: "+notifResults.length);

                if(notifResults.length != 0){
                    var count = 0;
                    notifResults.forEach(function( v, err){
                        // console.log("v: " + v)

                        //includes all fulfillment notifs
                        if(v.type == "Fulfillment" ){
                            requestModel.findOne({request_ID: v.request_ID}, function(err, requestResults){
                                // console.log("requestResults: " + requestResults)

                                    var notif = {
                                        notifDate : v.date.toDateString(),
                                        notif_ID: v.notif_ID,
                                        type: v.type,
                                        username: username,
                                        title: requestResults.book_title,
                                        aName: requestResults.book_author,
                                        requestDate: requestResults.date_requested.toDateString()
                                    }
                    
                                    notifs.push(notif);
                                
                
                                count++;
                                if(count == notifResults.length){
                                    // console.log("notifs: " + JSON.stringify(notifs, null, '   '));
                
                                    res.render("notification", {
                                        notifs: notifs
                                    });
                                }
                            })
                        }
                        //includes update notifs that has no answer yet
                        else if(v.type == "Update" && v.response == "No Answer"){
                            requestModel.findOne({request_ID: v.request_ID, status: "Active"}, function(err, requestResults){
                                // console.log("requestResults: " + requestResults)

                                if(requestResults){
                                    var notif = {
                                        notifDate : v.date.toDateString(),
                                        notif_ID: v.notif_ID,
                                        type: v.type,
                                        username: username,
                                        title: requestResults.book_title,
                                        aName: requestResults.book_author,
                                        requestDate: requestResults.date_requested.toDateString()
                                    }
                    
                                    notifs.push(notif);
                                }
                
                                count++;
                                if(count == notifResults.length){
                                    // console.log("notifs: " + JSON.stringify(notifs, null, '   '));
                
                                    res.render("notification", {
                                        notifs: notifs
                                    });
                                }
                            })

                        }
                        //else, it just increases the count so that it still works/renders
                        else{
                            count++;
                            if(count == notifResults.length){
                                // console.log("notifs: " + JSON.stringify(notifs, null, '   '));
            
                                res.render("notification", {
                                    notifs: notifs
                                });
                            }

                        }
                        


                    })
                }else{
                    res.render("notification", {
                    });

                }
            })
        })

                    
    },
    getSendNotification: function(req,res){

        //computes for the difference in days between the date_requested and current_date
        const current_date =  new Date();
        console.log("current_date: " + current_date);
        const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        

        requestModel.find({status: "Active"}, function(err, ActiveRequests){
            // console.log("ActiveRequests: " + ActiveRequests);

            ActiveRequestsCount = 0;
            ActiveRequests.forEach(function(ActiveRequest, err){
                
                var username = ActiveRequest.username;
                var date_requested = ActiveRequest.date_requested; 
                var request_ID = ActiveRequest.request_ID;
                var ignored_notif_count = ActiveRequest.ignored_notif_count;
                // this computes for the difference in days of date_requested and the current_date
                var days = Math.round(Math.abs((date_requested - current_date) / oneDay ))  ; 

                // determines if the difference is a span of 2 weeks/14 days
                // if the value is 0, then eligible for sending a notif na, else, not
                var isEligible = days%14;

                // console.log("\n\nActiveRequest: " + ActiveRequest);
                



                // if pang-14th day na && NOT THE SAME DAY AS TODAY
                if(isEligible == 0 && days!= 0){
                    //finds all Update Notifications for that

                    // console.log("\nrequest_ID: " + request_ID);
                    // console.log("days: " + days);
                    // console.log("isEligible: " + isEligible);

                    
                    notifModel.find({request_ID: request_ID, type: "Update"}, function(err, notifsResult){

                        // console.log("notifsResult.length: "+ notifsResult.length);
                        // console.log("notifsResult: "+ notifsResult);

                        //if may laman na notifs
                        if(notifsResult.length != 0){

                            // console.log("may update na")
                            notifsResultCount = 0;
                            var meronna = false;
                            notifsResult.forEach(function(n, err){
                                console.log(n)

                                var notifDate =  n.date;
                                // if meron nang notif made on current_date
                                if( Math.round(Math.abs((n.date - current_date) / oneDay )) == 0 ){
                                    //do nothing //end na

                                    // console.log("notifsResult: "+ notifsResult);
                                    meronna = true;

                                    notifsResultCount++;
                                    // if all 'update' notifs are checked na for that request
                                    // if(notifsResultCount == notifsResult.length){

                                    //     ActiveRequestsCount++;
                                    //     //if all active requests are checked na
                                    //     if(ActiveRequestsCount == ActiveRequests.length){
                                    //         //end
                                    //         res.send("ok na from may notif na on that day");
                                    //     }

                                    // }

                                }
                                // else, wala pang notif for that day(current day)
                                else{

                                    console.log("else part magccreate ng notiof dapat")
                                    console.log( Math.round(Math.abs((n.date - current_date) / oneDay )) )
                                    //make notif
                                    console.log(n.date);
                                    console.log(" n.date " +n.date);
                                    console.log( current_date);
                                    console.log("current_date : " +  current_date);

                                    notifsResultCount++;

                                    
                                            

                                }


                                if(notifsResultCount == notifsResult.length && meronna == false){
                                    requestModel.findOne({request_ID: request_ID}, function(err, requestResult){

                                        ignored_notif_count++; //plus 1 everytime na may notif na gagawin.
                                        console.log("ignored_notif_count: " +ignored_notif_count);

                                        requestModel.updateOne({request_ID: request_ID}, {$set: {ignored_notif_count: requestResult.ignored_notif_count+1}}, function(){

                                            var notification = new notifModel({
                                                notif_ID: ObjectId(),
                                                type : "Update",
                                                username: username,
                                                request_ID: request_ID,
                                                date: new Date()
                                            })
                                            notification.save();

                                        })

                                        // var notification = new notifModel({
                                        //     notif_ID: ObjectId(),
                                        //     type : "Update",
                                        //     username: username,
                                        //     request_ID: request_ID,
                                        //     date: new Date()
                                        // })
                                        // notification.save();

                                        // notifsResultCount++;
                                        // // if all 'update' notifs are checked na for that request
                                        // if(notifsResultCount == notifsResult.length){

                                        //     ActiveRequestsCount++;
                                        //     //if all active requests are checked na
                                        //     if(ActiveRequestsCount == ActiveRequests.length){
                                        //         //end
                                        //         res.send("ok na from may notif na but no notifs pa on that day");
                                        //     }

                                        // }
                                        


                                    })
                                }


                            })
                        }
                        //if wala pang update notif ever
                        else{
                            // make notif na

                            ignored_notif_count++; //plus 1 everytime na may notif na gagawin
                            console.log("if wala pang update notif ever!!  ignored_notif_count: "+ ignored_notif_count);
                            console.log("request_ID: " + request_ID)
                            requestModel.updateOne({request_ID: request_ID}, {$set: {ignored_notif_count: ignored_notif_count}}, function(){
                                console.log("PASOK SA UPDATE")
                                var notification = new notifModel({
                                    notif_ID: ObjectId(),
                                    type : "Update",
                                    username: username,
                                    request_ID: request_ID,
                                    date: new Date()
                                })

                                notification.save();

                                ActiveRequestsCount++;
                                //if all active requests are checked na
                                if(ActiveRequestsCount == ActiveRequests.length){
                                    //end
                                    res.send("ok na from else na wala pang notif ever");
                                }
                            })
                        }
                    } )

                }
                // else (hindi pang-14th day)
                else{
                    //do nothing
                    

                    ActiveRequestsCount++;
                    //if all active requests are checked na
                    if(ActiveRequestsCount == ActiveRequests.length){
                        //end
                        res.send("ok na, hindi pang-14th day so no notif made");
                    }
                    

                }

                




            })

            // console.log("ActiveRequests: "+ ActiveRequests);
            // res.send(true);

        })
    },

    getUnseenNotifsCount: function(req, res){

        notifModel.find({username: req.session.username, seen: false}, function(err, notifResult){

            res.send(notifResult.length.toString());
        })

    },

    postResponseNo: function(req,res){
        var notif_ID = req.body.notif_ID;

        res.send(notif_ID)
        notifModel.findOneAndUpdate({notif_ID: notif_ID}, {$set: {response: "No"}},function(notifErr, notifData){
            // console.log("notifData: " + notifData);
            // console.log("notifErr: " + notifErr)

            var request_ID = notifData.request_ID;
            // cancels the request since the user is no longer interested in the book.
            requestModel.findOneAndUpdate({request_ID: request_ID}, {$set: {status: "Cancelled"}},function(requestErr, requestData){
                // console.log("requestData: " + requestData);
                // console.log("requestErr: " + requestErr)
    
            })
        })
    },

    postResponseYes: function(req,res){
        var notif_ID = req.body.notif_ID;

        
        notifModel.findOneAndUpdate({notif_ID: notif_ID}, {$set: {response: "Yes"}},function(notifErr, notifData){
            console.log("notifData: " + notifData);
            console.log("notifErr: " + notifErr)

            var request_ID = notifData.request_ID;
            //sets the ignored_notif_count back to zero ((used in auto cancellation of request ))
            requestModel.findOneAndUpdate({request_ID: request_ID}, {$set: {ignored_notif_count: 0}},function(requestErr, requestData){
                console.log("requestData: " + requestData);
                console.log("requestErr: " + requestErr)
                res.send(notif_ID)
    
            })
        })
    }
}

module.exports = notificationController;
