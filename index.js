const express = require('express')
const app = express()
const port = process.env.PORT || 9090;
const hbs = require("hbs")
// const mongoose = require('mongoose');

const routes = require('./routes/routes.js');
const db = require('./model/db.js');

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname + "/public"));

app.use('/', routes);

db.connect();

app.listen(port, function(){
    console.log('App listening at port ' + port)
});

