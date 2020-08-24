const adminController = {
    getAddProduct: function(req,res){
        res.render("addproducts",{});
    },
    getAdminRequestList: function(req,res){
        res.render("adminRequestsListCollective",{});
    },
    getAdminRequestListCollective: function(req,res){
        res.render("adminRequestsListCollective",{});
    },
    getAdminRequestListIndividual: function(req,res){
        res.render("adminRequestsListIndividual",{});
    },
    getAdminRequestListSTBC: function(req,res){
        res.render("adminRequestsListSTBC",{});
    }
}

module.exports = adminController;