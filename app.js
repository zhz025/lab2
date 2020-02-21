/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')
var hbs = handlebars.create({
  helpers: {
    formatDate: function(date) {
      return  new Date(date).toDateString();
    },
    countTime: function(date) {
      var myDate = new Date();
      var xTtime = myDate.toLocaleDateString( ).replace(/\//g, '-');   
      var  startDate = Date.parse(new Date(date).toDateString());
      var  endDate = Date.parse(xTtime);
      var days=(endDate - startDate)/(1*24*60*60*1000);
      return Math.abs(parseInt(days));
    },
    jsonstringify: function(obj) {

      return JSON.stringify(obj);
    }
  }
})
var indexRouter = require('./routes/index');
// Example route
var userRouter = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'static')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

global.isLogin = function(req,res,next) {
  if(!req.cookies.isLogin) {
    res.redirect("/login")
  } else {
    next()
  }
}
// Add routes here
app.get('/', global.isLogin,indexRouter.view);
app.get('/Assignment', global.isLogin, indexRouter.Assignment)
app.get('/calendar', global.isLogin, indexRouter.calendar)
app.get('/Todolist', global.isLogin, indexRouter.Todolist)
app.get('/Planforme', global.isLogin, indexRouter.Planforme)
app.get('/login', userRouter.loginView)
app.get('/register', userRouter.registerView)

require('./routes/api/Api').init(app)
// Example route

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});