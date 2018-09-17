const express = require('express');
const indexRouter = require('./src/routes/index');

const app = express()
app.use(express.json())

indexRouter(app)



module.exports = app;
