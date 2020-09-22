
const db = require('../model/db.js');
const notifModel = require('../model/notifModel.js');
const requestModel = require('../model/requestModel.js');





const notificationController ={
    getNotification: function(req,res){

        var username = req.session.username;
        var notifDate, requestDate, username, aName, title, response;

        var notifs = [];
        notifModel.find({username: username}, function(err, notifResults){

            var count = 0;
            notifResults.forEach(function( v, err){

                requestModel.findOne({request_ID: v.request_ID}, function(err, requestResults){
                    console.log("requestResults: " + requestResults)

                    var notif = {
                        notifDate : v.date.toDateString(),
                        type: v.type,
                        username: username,
                        title: requestResults.book_title,
                        aName: requestResults.book_author,
                        requestDate: requestResults.date_requested.toDateString()
                    }
    
                    notifs.push(notif);
    
                    count++;
                    if(count == notifResults.length){
                        console.log("notifs: " + JSON.stringify(notifs, null, '   '));
    
                        res.render("notification", {
                            notifs: notifs
                        });
    
                    }

                })
            })
        })
    }
}

module.exports = notificationController;
