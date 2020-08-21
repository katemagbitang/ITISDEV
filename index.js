const express = require('express')
const app = express()
const port = 9090
const hbs = require("hbs")

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname + "/public"));

app.get('/',function(req,res){
	res.render("index", {});
});

app.get('/home',function(req,res){
	res.render("home",{});
});

app.get('/signup',function(req,res){
	res.render("signup",{});
});

app.get('/login',function(req,res){
	res.render("login",{});
});

app.get('/cart',function(req,res){
	res.render("cart",{});
});

app.get('/requestbook',function(req,res){
	res.render("requestform",{});
});

app.get('/requestlist',function(req,res){
	res.render("requestlist",{});
});

app.get('/productdetailspage',function(req,res){
	res.render("productdetailspage",{});
});

app.get('/pageslist',function(req,res){
	res.render("pageslist",{});
});


app.get('/messages',function(req,res){
	res.render("messages",{});
});

app.get('/logout',function(req,res){
	res.render("index_loggedout",{});
});

app.get('/productpage',function(req,res){
	res.render("productpage",{});
});

app.get('/confirmpayment',function(req,res){
	res.render("confirmpayment",{});
});

app.get('/Orders',function(req,res){
	res.redirect("/Orders/ToPay");
});

app.get('/Orders/ToPay',function(req,res){
	res.render("userOrdersToPay",{});
});

app.get('/Orders/PaymentProcessing',function(req,res){
	res.render("userOrdersPaymentProcessing",{});
});

app.get('/Orders/Confirmed',function(req,res){
	res.render("userOrdersConfirmed",{});
});

app.get('/Orders/Cancelled',function(req,res){
	res.render("userOrdersCancelled",{});
});

app.get('/AddPRoducts',function(req,res){
	res.render("addproducts",{});
});

app.get('/adminRequestsList',function(req,res){
	res.render("adminRequestsListIndividual",{});
});

app.get('/adminRequestsList/Collective',function(req,res){
	res.render("adminRequestsListCollective",{});
});

app.get('/adminRequestsList/Individual',function(req,res){
	res.render("adminRequestsListIndividual",{});
});

app.get('/adminRequestsList/Soon-to-be-Cancelled',function(req,res){
	res.render("adminRequestsListSTBC",{});
});

app.listen(port, function(){
    console.log('App listening at port ' + port)
});

