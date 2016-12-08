var express = require('express');
var app = express();
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var queryDb = require('./queryDb');

app.use(express.static(__dirname + '/Static'));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json({
    extended: false
}));

app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
}));

var isAdmin = function(req, res, next) {
    next();
}

app.get('/queryUsers', function(req, res, next) {
    var query = "SELECT * from users";
    queryDb.queryTable(query, function(err, result) {
        if(err) {
            console.log(err);
            return;
        }
        
        if(result) {
            res.json(result.rows);
        }
        
    });
});

app.get('/queryPurchases', function(req, res, next) {
    var query = "SELECT * from purchases";
    queryDb.queryTable(query, function(err, result) {
        if(err) {
            console.log(err);
            return;
        }
        
        if(result) {
            res.json(result.rows);
        }
        
    });    

});

app.get('/queryJournies', function(req, res, next) {
    var query = "SELECT * from tickets";
    queryDb.queryTable(query, function(err, result) {
        if(err) {
            console.log(err);
            return;
        }
        
        if(result) {
            res.json(result.rows);
        }
        
    });
});

app.listen(process.env.PORT || 5555);