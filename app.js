const express = require('express');

const app = express()
app.use(express.json())

console.log("in app")

module.exports = app;
