const m$auth = require('../modules/auth.module')
const { Router } = require('express')
const response = require('../helpers/response')
const { prisma } = require('@prisma/client')

const AuthController = Router()

/** 
* Login
* @param {string} email
* @param {string} password
// http://localhost:8000/api/login
*/
AuthController.post('/login', async (req, res) => {
    const login = await m$auth.login(req.body)

    response.sendResponse(res, login)
})

module.exports = AuthController