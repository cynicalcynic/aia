const db = require('./db.js');

class ItemBoughtError extends Error {
    constructor(message) {
        super(message);
    }
}


function checkout(uuids) {

    const getProduct = db.prepare('SELECT * FROM products WHERE uuid = ?');
    const deleteProduct = db.prepare('DELETE FROM products WHERE uuid = ?');

    const transaction = db.transaction(uuids => {
        for (const uuid of uuids) {
            const row = getProduct.get([uuid]);
            if (!row) {
                throw new ItemBoughtError('Item already bought');
            } else {
                deleteProduct.run(uuid);
            }
        }
    });

    transaction(uuids);
}

module.exports = {checkout, ItemBoughtError};