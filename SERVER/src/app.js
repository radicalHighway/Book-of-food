const express = require('express');
const morgan = require('morgan');
const corsConfig = require("../configs/cors.config")
const cors = require("cors")

const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsConfig))


module.exports = app;