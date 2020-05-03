const db = require('./db.js');

function getProducts() {
    const stmt = db.prepare('SELECT * FROM products');
    return stmt.all();
}

function getProductsByUuids(uuids) {
    const sql = `SELECT * FROM products WHERE uuid IN (${'?'.repeat(uuids.length).split('').join(',')})`
    const stmt = db.prepare(sql);
    return stmt.all(uuids);
}


module.exports = {
    getProducts,
    getProductsByUuids
}


