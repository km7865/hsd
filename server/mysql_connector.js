const mysql = require('mysql')

const config = {
    host: 'localhost',
    user: 'test1',
    password: '1234',
    database: 'hsd',
    dateStrings: 'date',
    connectionLimit: 30,
    multipleStatements: true
}

let pool = mysql.createPool(config)

function getConnection(callback) {
    pool.getConnection(function (err, conn) {
        if (!err) {
            callback(conn);
        }
    });
}

module.exports = getConnection;