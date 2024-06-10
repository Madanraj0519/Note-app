const express = require('express');
const authRoute = express.Router();
const { userRegister, userLogin, getUser } = require("../controller/auth.controller");
const { authenticateToken } = require('../utilities');

authRoute.post('/create-account', userRegister );
authRoute.post('/login', userLogin );
authRoute.get('/get-user', authenticateToken, getUser );


module.exports = { authRoute };