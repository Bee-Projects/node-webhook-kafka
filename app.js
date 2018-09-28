var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const _ = require('lodash');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const config = require('./config');

var getPluginRoutes = (config) => {
  return _.flatten(_.map(config.plugins, (params, name) => {
    if (params.enabled) {
      const plugin = require('./plugins/' + name);
      if (_.isFunction(plugin.getRoutes)) {
        return plugin.getRoutes(config);
      }
    }
  }));
}


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var routes = getPluginRoutes(config);
_.forEach(routes, (routeConfig) => {
  var router = express.Router();
  if (routeConfig.method == 'get') {
    router.get(routeConfig.path, routeConfig.handler);
  } else if (routeConfig.method == 'post') {
    router.post(routeConfig.path, routeConfig.handler);
  }
  app.use(router);
})

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
