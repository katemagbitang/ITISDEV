const express = require('express')
const app = express()
const port = 9090
const hbs = require("hbs")

const routes = require('./routes/routes.js');

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname + "/public"));

app.use('/', routes);

app.listen(port, function(){
    console.log('App listening at port ' + port)
});

