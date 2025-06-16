const express = require('express')
const unAuthenRoutes = express.Router()
const { login } = require('../controller/auth.controller')

unAuthenRoutes.post('/login', login)

module.exports = unAuthenRoutes