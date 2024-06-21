const express = require('express');
const {
    login
} = require('../controllers/authController');

const authRoute = express.Router();

authRoute.post('/login', login);

module.exports = authRoute;