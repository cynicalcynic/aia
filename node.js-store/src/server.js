const express = require('express');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const FileStore = require('session-file-store')(expressSession);
const path = require('path');
const app = express();
const {getProducts, getProductsByUuids} = require('./product.js');
const {checkout, ItemBoughtError} = require('./cart.js');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded());
app.use(expressSession({
    name: 'session',
    secret: 'COVID-19',
    store: new FileStore({}),
}))

app.use((req, res, next) => {
    if (!Array.isArray(req.session.cart)) {
        req.session.cart = [];
    }
    next();
})

app.get('/', (req, res, next) => {
    let error;
    switch (req.query.error) {
        case undefined :
            error = null;
            break;
        case 'itembought' :
            error = 'Item has already been bought.';
            break;
        default:
            error = 'Something went wrong';
    }
    const products = getProducts();
    //remove items bought by someone else from the cart
    req.session.cart = req.session.cart.filter(uuid => products.some(product => product.uuid === uuid));
    res.render('index', {error: error, products, cart: req.session.cart});
});

app.post('/add_to_cart', (req, res) => {
    req.session.cart.push(req.body.uuid);
    res.redirect('/');
});

app.post('/remove_from_cart', (req, res) => {
    req.session.cart = req.session.cart.filter(uuid => uuid !== req.body.uuid);
    res.redirect('/cart');
});

app.post('/clear_cart', (req, res) => {
    req.session.cart = [];
    res.redirect('/');
});

app.get('/cart', (req, res, next) => {
    const cart = getProductsByUuids(req.session.cart);
    res.render('checkout', {cart});
});

app.post('/checkout', (req, res, next) => {
    try {
        checkout(req.session.cart);
        req.session.cart = [];
        res.redirect('/');
    } catch (e) {
        req.session.cart = [];
        if (e instanceof ItemBoughtError) {
            res.redirect('/?error=itembought')
        } else {
            next(e);
        }
    }
});

app.get('/reset', (req, res, next) => {
    require('fs').readFile(path.join(__dirname, '../create_db.sql'), 'utf8', (err, data) => {
        if (err) return next(err);

        require('./db.js').exec(data);
    });
    res.redirect('/');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal server error');
})

app.listen(8080, () => console.log('Running at 8080'));