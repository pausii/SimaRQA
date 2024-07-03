const express = require('express');

const { getAllMaintenanceTransaction, getMaintenanceTransactionById, createMaintenanceTransaction, updateMaintenanceTransaction, exportMaintenanceTransactionToExcel, searchMaintenanceTransaction} = require('../controllers/maintenanceTransactionController');

const { tokenVerified, adminOrDivision } = require('../middlewares/token');

const route = express.Router();

route.get('/', [tokenVerified, adminOrDivision], getAllMaintenanceTransaction);
route.get('/search', [tokenVerified, adminOrDivision], searchMaintenanceTransaction);
route.get('/:id', [tokenVerified, adminOrDivision], getMaintenanceTransactionById);
route.post('/', [tokenVerified, adminOrDivision], createMaintenanceTransaction);
route.put('/:id', [tokenVerified, adminOrDivision], updateMaintenanceTransaction);
// route.get('/export/pdf', [tokenVerified, adminOrDivision], printAllMaintenanceReports);
route.get('/export/excel', exportMaintenanceTransactionToExcel);

module.exports = route;