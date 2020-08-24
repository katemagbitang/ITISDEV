const orderController = {
    getOrders: function(req,res){
        res.redirect("/Orders/ToPay");
    },
    getOrdersToPay: function(req,res){
        res.render("userOrdersToPay",{});
    },
    getOrdersPayment: function(req,res){
        res.render("userOrdersPaymentProcessing",{});
    },
    getOrdersConfirmed: function(req,res){
        res.render("userOrdersConfirmed",{});
    },
    getOrdersCancelled: function(req,res){
        res.render("userOrdersCancelled",{});
    }
}

module.exports = orderController;