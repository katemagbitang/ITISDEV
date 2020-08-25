const userController = {
    getSignUp: function(req,res){
        res.render("signup",{});
    },
    getLogin: function(req,res){
        res.render("login",{});
    },
    getLogout: function(req,res){
        res.render("index_loggedout",{});
    },
    getMessage: function(req,res){
        res.render("messages",{});
    }
}

module.exports = userController;