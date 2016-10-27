var express = require('express');
var http = require('https');
var app = express();
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var pg = require('pg');
var querystring = require('querystring');
var url = require('url');
//var session = require('express-session');
var dbUrl = process.env.DATABASE_URL || "postgres://spiced:spiced1@localhost:5432/bookMe";
//var configSession = require('connect-redis')(session);
var redis = require('redis');
var client = redis.createClient({
    host: 'localhost',
    port: 6379
});

client.on('error', function(err) {
    console.log(err);
});

//app.use(session({
//    store: new configSession({
//        ttl: 3600,
//        host: 'localhost',
//        port: 6379
//    }),
//    resave: false,
//    saveUninitialized: true,
//    secret: 'nothing in my mind now'
//}));

app.use(express.static(__dirname + '/Static'));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json({
    extended: false
}));
//ask David how to separate your sessions so some are stored in Redis and others in memory
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));


app.listen(process.env.PORT || 5555);
