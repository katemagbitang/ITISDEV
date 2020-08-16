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


app.get('/messages',function(req,res){
	res.render("messages",{});
});

app.get('/logout',function(req,res){
	res.render("index_loggedout",{});
});


app.listen(port, function(){
    console.log('App listening at port ' + port)
});

