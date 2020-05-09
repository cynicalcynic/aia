require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const expressSession = require('express-session')
const authRoutes = require('./api/routes/auth.js');
const app = express();

app.use(bodyParser.json());
app.use(expressSession({
    secret : process.env.COOKIE_SECRET,
    resave : false,
    saveUninitialized : false
}));

app.use('/api/auth', authRoutes);

app.listen(8080, () => {
    console.log('Running at 8080');
});