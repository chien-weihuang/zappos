var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '0000',
    database : 'restaurants'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;