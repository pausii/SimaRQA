const express = require('express');

const { getUserProfile, updateUserProfile, changeUserPassword } = require('../controllers/profileController');

const { tokenVerified, adminOrDivision } = require('../middlewares/token');

const profileRoute = express.Router();

// Profile Admin
profileRoute.get('/', [tokenVerified, adminOrDivision], getUserProfile);
profileRoute.put('/', [tokenVerified, adminOrDivision], updateUserProfile);
profileRoute.put('/change-password', [tokenVerified, adminOrDivision], changeUserPassword);


module.exports = profileRoute;