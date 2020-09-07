const express = require('express');

const controller = require('../controllers/controller.js');
const userController = require('../controllers/userController.js');
const orderController = require('../controllers/orderController.js');
const adminController = require('../controllers/adminController.js');
const messageController = require('../controllers/messageController.js');
const bookController = require('../controllers/bookController.js');

// const validation = require('../helpers/validation.js');

const app = express();

app.get('/',controller.getIndex);
app.get('/home',controller.getHome);

app.get('/signup',userController.getSignUp);

app.get('/getsession', controller.getSession);

app.get('/login',userController.getLogin);
app.post('/login', userController.postLogin);

app.get('/logout',userController.getLogout);

app.get('/getUsername', userController.getUsername);
app.get('/getEmail', userController.getEmail);

app.get('/messages', messageController.getMessage);
app.get('/messages/:username', messageController.getMessageByUsername);
app.post('/messages/:username', messageController.postMessage);
app.post('/composenewmessage', messageController.composenewmessage);
// app.get('/getMessagesList/:username', messageController.getMessagesList);
// app.get('/getMessages/:username/:messages', messageController.getMessages);
// app.get('/messages/:messages/:messagesList', messageController.getMessage);
// app.get('/messages/:username/:messages/:messagesList', messageController.getMessageByUsername);


app.post('/signup',userController.postSignup);

app.get('/cart',function(req,res){
	res.render("cart",{});
});

app.get('/checkout',function(req,res){
	res.render("checkout",{});
});

app.get('/requestbook',function(req,res){
	res.render("requestform",{});
});

app.get('/requestlist',function(req,res){
	res.render("requestlist",{});
});
app.get('/requestlist/cancelled',function(req,res){
	res.render("requestlistCancelled",{});
});




app.get('/productdetailspage',function(req,res){
	res.render("productdetailspage",{});
});

app.get('/pageslist',function(req,res){
	res.render("pageslist",{});
});

app.get('/productpage',bookController.getBook);
app.get('/productpage/:category',bookController.getBookByCategory);

app.get('/confirmpayment',function(req,res){
	res.render("confirmpayment",{});
});

app.get('/generatesalesreport',function(req,res){
	res.render("generatesalesreport",{});
});

app.get('/salesreport',function(req,res){
	res.render("salesreport",{});
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
app.get('/adminRequestsList/Individual/:something',adminController.getAdminRequestListIndividual);
app.get('/adminRequestsList/Soon-to-be-Cancelled',adminController.getAdminRequestListSTBC);

module.exports = app;
