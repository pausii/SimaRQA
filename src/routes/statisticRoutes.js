const express = require('express');
const { getCountData } = require('../controllers/statisticController');

const { tokenVerified, adminOrDivision } = require('../middlewares/token');

const route = express.Router();

route.get('/', [tokenVerified, adminOrDivision], getCountData);

module.exports = route;