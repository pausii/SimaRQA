const express = require('express');

const { getUserProfile, editUserProfile, changeUserPassword } = require('../controllers/profileController');

const { tokenVerified, onlyAdmin, forDivision } = require('../middlewares/token');

const profileRoute = express.Router();

// Profile Admin
profileRoute.get('/profile-admin', [tokenVerified, onlyAdmin], getUserProfile);
profileRoute.put('/profile-admin', [tokenVerified, onlyAdmin], editUserProfile);
profileRoute.put('/change-password-admin', [tokenVerified, onlyAdmin], changeUserPassword);

// Profile Division
profileRoute.get('/profile-division', [tokenVerified, forDivision], getUserProfile);
profileRoute.put('/profile-division', [tokenVerified, forDivision], editUserProfile);
profileRoute.put('/change-password-division', [tokenVerified, forDivision], changeUserPassword);


module.exports = profileRoute;