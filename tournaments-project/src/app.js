require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

async function run(){
    // mongodb+srv://cynical:<password>@aia-ht9kv.mongodb.net/<dbname>?retryWrites=true&w=majority
    try{
        const {MONGODB_USER, MONGODB_PASSWORD, MONGODB_HOST, MONGODB_DB} = process.env;
        const mongoString = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}/${MONGODB_DB}?retryWrites=true&w=majority`;
        await mongoose.connect(mongoString, {useNewUrlParser: true, useUnifiedTopology: true});
    }
    catch(error) {
        console.error('Database error');
        process.exit(1);
    }


    const app = express();

    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));
    app.use(bodyParser.urlencoded({extended : true}));
    app.use(routes);

    app.listen(process.env.PORT, () => {
        console.log('Listening on port ' + process.env.PORT);
    })
}

run();