const express = require('express')
const app = express()
const port = process.env.PORT || 9090;
const hbs = require("hbs")
// const mongoose = require('mongoose');

const routes = require('./routes/routes.js');
const db = require('./model/db.js');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

//const multer = require('multer');

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname + "/public"));

db.connect();

// use `express-session`` middleware and set its options
// use `MongoStore` as server-side session storage
app.use(session({
    'secret': 'chapterone-secret',
    'resave': false,
    'saveUninitialized': false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));

// parses incoming requests with urlencoded payloads
app.use(express.urlencoded({extended: true}));

app.use('/', routes);

app.listen(port, function(){
    console.log('App listening at port ' + port)
});

