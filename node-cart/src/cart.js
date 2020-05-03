const conn = require('./db.js').getConnection();
const {promisify} = require('util');
const run = promisify(conn.run).bind(conn);
const get = promisify(conn.get).bind(conn);

class CheckoutError extends Error {
    constructor(message) {
        super(message);
    }
}

async function checkout(uuids) {
    let ok = true;
    try {
        await run('BEGIN TRANSACTION');
        for (const uuid of uuids) {
            const row = await get('SELECT * FROM products WHERE uuid = ?', [uuid]);
            if (row) {
                await run('DELETE FROM products WHERE uuid = ?', [uuid]);
            } else {
                ok = false;
                break;
            }
        }
    } catch (e) {
        throw e;
    }
    if (ok) {
        await run('COMMIT');
    } else {
        await run('ROLLBACK');
        throw new CheckoutError('Item already bought');
    }

}

module.exports = {checkout, CheckoutError};