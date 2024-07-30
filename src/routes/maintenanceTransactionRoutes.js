const express = require('express');

const { 
    getAllMaintenanceTransaction,
    getMaintenanceTransactionById,
    createMaintenanceTransaction,
    updateMaintenanceTransaction,
    exportMaintenanceTransactionToExcel,
    searchMaintenanceTransaction,
} = require('../controllers/maintenanceTransactionController');

const {
    startMaintenanceSchedule,
    stopMaintenanceSchedule
} = require('../controllers/notificationController');

const { tokenVerified, forDivision } = require('../middlewares/token');

const route = express.Router();

route.get('/', [tokenVerified, forDivision], getAllMaintenanceTransaction);
route.get('/search', [tokenVerified, forDivision], searchMaintenanceTransaction);
route.get('/:id', [tokenVerified, forDivision], getMaintenanceTransactionById);
route.post('/', [tokenVerified, forDivision], createMaintenanceTransaction);
route.put('/:id', [tokenVerified, forDivision], updateMaintenanceTransaction);
route.get('/export/excel', [tokenVerified, forDivision], exportMaintenanceTransactionToExcel);

route.post('/schedule/start', [tokenVerified, forDivision], startMaintenanceSchedule);
route.post('/schedule/stop', [tokenVerified, forDivision], stopMaintenanceSchedule);

module.exports = route;