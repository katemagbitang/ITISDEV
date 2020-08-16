const express = require('express')
const app = express()
const port = 9090
const hbs = require("hbs")

app.get('/',function(req,res){
	res.send("index");
});

app.get('/home',function(req,res){
	res.send("home");
});

app.set('view engine', 'hbs')

hbs.registerPartials(__dirname + '/views/partials');
// app.use(express.static('public'));

app.listen(port, function(){
    console.log('App listening at port ' + port)
});