const express = require('express');

const { getAllBorrowedReturnTransaction, getBorrowedReturnTransactionById, searchPeminjamanPengembalianAsset, createBorrowedReturnTransaction, updateBorrowedReturnTransaction, exportBorrowedReturnTransactionToExcel, searchMaintenanceTransaction} = require('../controllers/borrowedReturnTransactionController');

const { tokenVerified, adminOrDivision } = require('../middlewares/token');

const route = express.Router();

route.get('/', [tokenVerified, adminOrDivision], getAllBorrowedReturnTransaction);
route.get('/search', [tokenVerified, adminOrDivision], searchPeminjamanPengembalianAsset);
route.get('/:id', [tokenVerified, adminOrDivision], getBorrowedReturnTransactionById);
route.post('/', [tokenVerified, adminOrDivision], createBorrowedReturnTransaction);
route.put('/:id', [tokenVerified, adminOrDivision], updateBorrowedReturnTransaction);
// route.get('/export/pdf', [tokenVerified, adminOrDivision], printAllMaintenanceReports);
route.get('/export/excel', exportBorrowedReturnTransactionToExcel);

module.exports = route;