const controller ={
    getIndex: function(req,res){
        res.render("index", {});
    },
    getHome: function(req,res){
        res.render("home",{});
    }
}

module.exports = controller;