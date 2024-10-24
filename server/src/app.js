const express = require('express');
const helmet=require("helmet");
const cors = require("cors");
const routes = require('./routes/index');

const app  = express();
//Helmet is a middleware that helps secure your Express.js applications by setting various HTTP headers.
app.use(helmet());
//This middleware is used for parsing JSON data sent in the request body.
app.use(express.json());
//This middleware is used for parsing URL-encoded data in the request body.
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', routes)
module.exports = app;