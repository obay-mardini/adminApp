var URL = require("url-parse");
var pg = require('pg');
var dbUrl = process.env.DATABASE_URL || Buffer(require('./passwords.json').postgres).toString();
var herokuDb = new URL(dbUrl) || null;
var config = {
    user: herokuDb.username,
    database: herokuDb.pathname.slice(1),
    password: herokuDb.password,
    host: herokuDb.hostname,
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
};
var pool = new pg.Pool(config);

function queryTable(query, callback) {
    pool.connect(function(err, client, done) {
        if (err) {
            callback('error fetching client from pool')
            return;
        }

        client.query(query, [], function(error, result) {
            if (error) {
                callback(error);
                done();
            } else {
                callback(null, result);
                done();
            }

        });
    });
}

exports.queryTable = queryTable;
