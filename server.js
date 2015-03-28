// server.js

    // set up ========================
    var express = require('express'),
        app = express(), 
        mongoose = require('mongoose'), 
        passport = require('passport'),
        flash = require('connect-flash'), 
        path = require('path'),
        morgan = require('morgan'), // log requests to the console (express4)
        cookieParser = require('cookie-parser'),
        bodyParser = require('body-parser'), // pull information from HTML POST (express4)
        session = require('express-session'),
        methodOverride = require('method-override'), // simulate DELETE and PUT (express4)
        port = process.env.PORT || 8080, // set the port
        database = require('./config/database'); // load the database config
 
    // configuration ===============================================================
    mongoose.connect(database.url); // connect to mongoDB database on modulus.io
    
    require('./config/passport')(passport); // pass passport for configuration

    app.use(express.static(__dirname + '/public'));  
    //app.use(express.static(__dirname + ''));               // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(cookieParser()); // read cookies (needed for auth)
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

    app.set('view engine', 'ejs'); // set up ejs for templating

    // required for passport
    app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions
    app.use(flash()); // use connect-flash for flash messages stored in session

    // load the routes
    require('./app/routes')(app, passport);

    // listen (start app with node server.js) ======================================
    app.listen(port);
    console.log("App listening on port" + port);