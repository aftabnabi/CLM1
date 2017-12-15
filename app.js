/**
 * Module dependencies.
 */

var routes = require('./routes');
//var errorHandler = require('errorhandler');
var http = require('http');
var path = require('path');
var util = require('util-inspect');
var express = require("express");
var favicon = require('favicon');
var app = express();
var morgan = require('morgan');
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(morgan('combined'));
//app.use(favicon("/", function(data){console.log(data);}));
//app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
//app.use(express.methodOverride());
//app.use(app.router);
//var bodyparser=require('body-parser');
//app.use(bodyparser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));

app.use('/bower_components', express.static(__dirname + '/bower_components'));
// development only

app.get('/', routes.index);
app.get('/about', routes.about);
app.get('/contact', routes.contact);

var roductCategoryRouteConfig = require('./routes/productCategoryRouteConfig.js');
new roductCategoryRouteConfig(app); // here we use new,  'new' here

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
app.use(express.static(path.join(__dirname, 'public')));
//app.use(errorHandler());