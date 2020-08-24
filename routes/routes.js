const express = require('express');

const orderController = require('../controllers/orderController.js');
const adminController = require('../controllers/adminController.js');

const app = express();

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

app.get('/Orders',orderController.getOrders);

app.get('/Orders/ToPay',orderController.getOrdersToPay);

app.get('/Orders/PaymentProcessing',orderController.getOrdersPayment);

app.get('/Orders/Confirmed',orderController.getOrdersConfirmed);

app.get('/Orders/Cancelled',orderController.getOrdersCancelled);

app.get('/addProducts',adminController.getAddProduct);

app.get('/adminRequestsList',adminController.getAdminRequestList);

app.get('/adminRequestsList/Collective',adminController.getAdminRequestListCollective);

app.get('/adminRequestsList/Individual',adminController.getAdminRequestListIndividual);

app.get('/adminRequestsList/Soon-to-be-Cancelled',adminController.getAdminRequestListSTBC);

module.exports = app;