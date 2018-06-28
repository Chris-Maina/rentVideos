if (process.env.NODE_ENV !== 'production') require('dotenv').load();
const mongoose = require('mongoose'); 
const express = require('express');
const bodyParser =require('body-parser');
const app = express();

const port = process.env.PORT;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());

// config
const db = require('./config/db');
mongoose.connect(db.url);


// registering all routes
const router  = require('./app/routes');
app.use('/api', router);

app.listen(port, () => console.log(`Listening on port ${port}...`));
