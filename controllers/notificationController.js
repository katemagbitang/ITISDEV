
const db = require('../model/db.js');






const notificationController ={
    getNotification: function(req,res){
            res.render("notification", {});
    }

}

module.exports = notificationController;
