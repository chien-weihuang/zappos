var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var menusRouter = require('./routes/menus');
var mysql = require('mysql');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/menus', menusRouter);


//Database connection



app.use(function(req, res, next){
    global.connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '0000',
        database : 'restaurants'
    });
    
    connection.connect();

    next();
});

app.get('/api',function(request,response){
    connection.query('SELECT * FROM restaurants', function(err, rows, fields)

    {
        console.log('Connection result error '+err);
        console.log('no of records is '+rows.length);
        response.writeHead(200, { 'Content-Type': 'application/json'});
        response.end(JSON.stringify(rows));
    });

} );






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
