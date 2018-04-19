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
// get restaurants
app.get('/api/restaurants',function(request,response){
    connection.query('SELECT * FROM restaurants', function(err, rows, fields)

    {
        console.log('Connection result error '+err);
        console.log('no of records is '+rows.length);
        response.writeHead(200, { 'Content-Type': 'application/json'});
        response.end(JSON.stringify(rows));
    });

} );
// get  items
app.get('/api/items',function(request,response){
    connection.query('SELECT * FROM meal_items', function(err, rows, fields)

    {
        console.log('Connection result error '+err);
        console.log('no of records is '+rows.length);
        response.writeHead(200, { 'Content-Type': 'application/json'});
        response.end(JSON.stringify(rows));
    });

} );
// get menus
app.get('/api/menus',function(request,response){
    connection.query('SELECT * FROM menus', function(err, rows, fields)

    {
        console.log('Connection result error '+err);
        console.log('no of records is '+rows.length);
        response.writeHead(200, { 'Content-Type': 'application/json'});
        response.end(JSON.stringify(rows));
    });

} );
// post restaurants
app.post('/api/restaurant_post', function(req, res){
    connection.query('INSERT INTO restaurants SET ?', req.body,
        function (err, result) {
            if (err) throw err;
            res.send('User POSTED to database with ID: ');
        }
    );
})
// post menus
app.post('/api/restaurant_items', function(req, res){
    connection.query('INSERT INTO restaurants SET ?', req.body,
        function (err, result) {
            if (err) throw err;
            res.send('User POSTED to database with ID: ' );
        }
    );
})
// post items
app.post('/api/restaurant_menu', function(req, res){
    connection.query('INSERT INTO restaurants SET ?', req.body,
        function (err, result) {
            if (err) throw err;
            res.send('User POSTED to database with ID: ');
        }
    );
})


// delete restaurants
app.delete('/api/restaurant', function(req, res){
    connection.query('DELETE restaurants SET ?', req.body,
        function (err, result) {
            if (err) throw err;
            res.send('User DELETED database with ID: ' );
        }
    );
})
// post menus
app.DELETE('/api/restaurant_items', function(req, res){
    connection.query('DELETE restaurants SET ?', req.body,
        function (err, result) {
            if (err) throw err;
            res.send('User DELETED database with ID: ' );
        }
    );
})
// post items
app.DELETE('/api/restaurant_menu', function(req, res){
    connection.query('DELETE restaurants SET ?', req.body,
        function (err, result) {
            if (err) throw err;
            res.send('User DELETED database with ID: ' );
        }
    );
})

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
