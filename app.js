const express = require('express');
const indexRouter = require('./src/routes/index');
const userRouter = require('./src/routes/users');
const enforce = require('express-sslify');

const app = express()
app.use(express.json())
app.use(enforce.HTTPS({trustProtoHeader: true}))

indexRouter(app)
userRouter(app)



module.exports = app;
