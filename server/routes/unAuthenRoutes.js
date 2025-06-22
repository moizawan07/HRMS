const express = require('express')
const unAuthenRoutes = express.Router()
const { login, forgetPassword, resetPassword } = require('../controller/auth.controller')

unAuthenRoutes.post('/login', login)

unAuthenRoutes.post('/forget-password', forgetPassword)

unAuthenRoutes.post('/reset-password/:token', resetPassword )

module.exports = unAuthenRoutes