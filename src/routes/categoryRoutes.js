const express = require('express');
const { 
    createCategory,
    getAllCategory,
    getCategoryById,
    updateCategory,
    deleteCategory,
    searchCategory, 
    getCountCategory
} = require('../controllers/categoryController');

const { tokenVerified, adminOrDivision } = require('../middlewares/token');

const route = express.Router();

route.get('/', [tokenVerified, adminOrDivision], getAllCategory);
route.get('/stats', [tokenVerified, adminOrDivision], getCountCategory);
route.get('/search', [tokenVerified, adminOrDivision], searchCategory);
route.get('/:id', [tokenVerified, adminOrDivision], getCategoryById);
route.post('/', [tokenVerified, adminOrDivision], createCategory);
route.put('/:id', [tokenVerified, adminOrDivision], updateCategory);
route.delete('/:id', [tokenVerified, adminOrDivision], deleteCategory);

module.exports = route;