const express = require('express');
const morgan = require('morgan');
const corsConfig = require('../configs/cors.config');
const cors = require('cors');
const recieptRouter = require('./routes/reciept.router');

const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsConfig));

app.use('/api/reciepts', recieptRouter);

module.exports = app;
