const express = require('express')
const request = require('supertest')
const indexRouter = require('../routes/index')

const testApp = express()
indexRouter(testApp)

test('GET /. Expect welcome message to say welcome!', async () => {
    const response = await request(testApp).get('/')
    expect(response.status).toBe(200)
    expect(response.body.message).toBe("Welcome!")
});