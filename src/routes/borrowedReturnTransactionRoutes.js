const express = require('express');

const { getAllBorrowedReturnTransaction, getBorrowedReturnTransactionById, searchPeminjamanPengembalianAsset, tambahPeminjamanAsset, pengembalianAsset, exportBorrowedReturnTransactionToExcel, searchMainten, tambahPeminjamanAsseta, pengembalianAssetnceTransaction} = require('../controllers/borrowedReturnTransactionController');

const { tokenVerified, adminOrDivision } = require('../middlewares/token');

const route = express.Router();

route.get('/', [tokenVerified, adminOrDivision], getAllBorrowedReturnTransaction);
route.get('/search', [tokenVerified, adminOrDivision], searchPeminjamanPengembalianAsset);
route.get('/:id', [tokenVerified, adminOrDivision], getBorrowedReturnTransactionById);
route.post('/', [tokenVerified, adminOrDivision], tambahPeminjamanAsset);
route.put('/:id', [tokenVerified, adminOrDivision], pengembalianAsset);
// route.get('/export/pdf', [tokenVerified, adminOrDivision], printAllMaintenanceReports);
route.get('/export/excel', [tokenVerified, adminOrDivision], exportBorrowedReturnTransactionToExcel);

module.exports = route;