const express = require('express');
const morgan = require('morgan');

const Router = require('./routes/routes');

const app = express();

// 1) MIDDLEWARES
app.use(morgan('dev'));

app.use(express.json());


// 3) ROUTES
app.use('/api', Router);

module.exports = app;
