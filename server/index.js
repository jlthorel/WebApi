var path = require('path');
var appConfig = require('./modules/appConfig');
var WebApiApp = appConfig({debug : 'info'});
var port = process.env.PORT || WebApiApp.getOption('App_port') || 3000;

// start logger
//var logger = require('./modules/logger').logger;
//logger.log('info', "Logger started");

// connect to the DB
var mongoose = require('mongoose');
var promise = mongoose.connect('mongodb://localhost/WebApi', {
    useMongoClient: true
    /* other options */
});
//var db = require('./modules/dbTools');
//var dbConn = db(WebApiApp);
//console.log(dbConn);
    
// create the server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var winston = require('winston');
var expressWinston = require('express-winston');

var cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
var passport = require('passport');
var localStrategy = require('passport-local' ).Strategy;

app.use(passport.initialize());
app.use(passport.session());

// user schema/model
var User = require('./models/userModel.js');

// configure passport
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console({
            json: true,
            colorize: true
        })
    ],
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    msg: 'HTTP {{req.method}} {{req.url}}', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
}));



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var authRoutes = require('./routes/authRoutes'); // importing authentification route
app.use('/api/v1/auth', authRoutes);

app.use(function (req, res, next) {
    res.setHeader('AcProductsss-Control-Allow-Origin', '*');
    res.setHeader('AcProductsss-Control-Allow-Methods', 'GET, POST');
    res.setHeader('AcProductsss-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});
console.log('base dir = ' +path.join(__dirname));

app.use(express.static(path.join(__dirname, '..')));
app.use(express.static(path.join(__dirname, '../client')));

console.log('client dir ' + path.join(__dirname, '../client'));


app.get('/', function (req, res) {
    res.render('index.html');
});
  
app.use(function (req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'});
});
  
app.listen(port);
  
console.log('todo list RESTful API server started on: ' + port);


//WebApiApp.setOption('toto','titi');
WebApiApp.listOptions();


console.log('totot');