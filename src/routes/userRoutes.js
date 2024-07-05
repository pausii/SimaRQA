const express = require('express');
const { 
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    searchUser
 } = require('../controllers/userControllers');
const { tokenVerified, onlyAdmin } = require('../middlewares/token');
const userRoute = express.Router();

userRoute.get('/', [tokenVerified, onlyAdmin], getAllUsers);
userRoute.get('/search', [tokenVerified, onlyAdmin], searchUser);
userRoute.get('/:id', [tokenVerified, onlyAdmin], getUserById);
userRoute.post('/', [tokenVerified, onlyAdmin], createUser);
userRoute.put('/:id', [tokenVerified, onlyAdmin], updateUser);
userRoute.delete('/:id', [tokenVerified, onlyAdmin], deleteUser);

module.exports = userRoute;