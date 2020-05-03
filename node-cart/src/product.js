const conn = require('./db.js').getConnection();

function getProducts() {
    return new Promise((resolve, reject) => {
        conn.all('SELECT * FROM products', (err, rows) => {
            if (err) {
                return reject(err)
            }
            resolve(rows);
        });
    });
}

function getProductsByUuids(uuids) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM products WHERE uuid IN (${'?'.repeat(uuids.length).split('').join(',')})`
        conn.all(sql, uuids, (err, rows) => {
            if (err) {
                return reject(err)
            }
            resolve(rows);
        });
    });
}


module.exports = {
    getProducts,
    getProductsByUuids
}


