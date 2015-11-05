var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');
var Sequelize = require('sequelize');

var sequelize = new Sequelize('postgres://jlxasdpwwuvdmr:IyMLwN53OG-PVCnro54sqbprT4@ec2-107-21-222-62.compute-1.amazonaws.com:5432/dejcmvtdel9mms',
    {
        dialectOptions: {
           ssl: true
        }
    });

var User = sequelize.define('user', {
    firstName : {
        type : Sequelize.STRING
    },
    lastName : {
        type: Sequelize.STRING
    }, 
    email : {
        type: Sequelize.STRING
    }
  },
  { 
    freezeTableName : true
  }
);

User.sync({force: true}).then(function(){
    console.log('database synched');
    User.create({firstName: 'Irfan', lastName: 'Mulic', email: 'imulic@gmail.com'});
    User.create({firstName: 'Vincent', lastName: 'Chan', email: 'v7chan@gmail.com'});
});


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
    src: __dirname,
    dest: path.join(__dirname, 'public'),
    debug: false,
    outputStyle: 'compressed',
    prefix: '/prefix'
}));
app.use(express.static(path.join(__dirname, 'public')));

// Routing
var routes = require('./routes/index');
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
