const sqlite3 = require('sqlite3').verbose();

let connection = null;

function getConnection() {
    if (connection) return connection;

    connection = new sqlite3.Database('data.db', (err) => {
        if (err) {
            throw(err);
        }
    });
    return connection;
}

module.exports = {
    getConnection
}