if (process.env.NODE_ENV !== 'production') require('dotenv').load();
const mongoose = require('mongoose'); 
const express = require('express');
const bodyParser =require('body-parser');
const morgan = require('morgan');
const cors = require('cors')
const app = express();

const port = process.env.PORT || 5000;

/**
 * Middlewares
 */
app.use(cors());
app.use(morgan('dev'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());

/**
 * Config
 */
const config = require('./config/config');
mongoose.connect(config.url, { useNewUrlParser: true });

/**
 * Routes
 */
const userRoutes = require('./app/routes/userRoutes');
const videoRoutes = require('./app/routes/videoRoutes');
const genreRoutes = require('./app/routes/genreRoutes');
const directorRoutes = require('./app/routes/directorRoutes');
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/videos', videoRoutes);
app.use('/api/v1/genres', genreRoutes);
app.use('/api/v1/directors', directorRoutes);

/**
 * Catch 404 errors and forward them to error handler
 */
app.use((req, res, next) => {
    const error = new Error('Resource not found');
    error.status = 404;
    next(error);
});

 /**
  * Error handler
  */
app.use((err, req, res, next) => {
    let error = process.env.NODE_ENV === 'development' ? err : {};
    const status = error.status || 500;
    res.status(status).json({ status: 'Failure', message: error.message })
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
