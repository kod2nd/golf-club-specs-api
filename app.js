const express = require('express');
const indexRouter = require('./src/routes/index');
const userRouter = require('./src/routes/users');

const app = express()
app.use(express.json())

indexRouter(app)
userRouter(app)



module.exports = app;
