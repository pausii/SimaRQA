const express = require('express');

const { 
    getAllBorrowedReturnTransaction,
    getBorrowedReturnTransactionById,
    tambahPeminjamanAsset,
    pengembalianAsset,
    exportBorrowedReturnTransactionToExcel,
    searchPeminjamanPengembalianAsset,
    getCountBorrowedReturnTransaction
} = require('../controllers/borrowedReturnTransactionController');

const { tokenVerified, adminOrDivision } = require('../middlewares/token');

const route = express.Router();

route.get('/', [tokenVerified, adminOrDivision], getAllBorrowedReturnTransaction);
route.get('/stats', [tokenVerified, adminOrDivision], getCountBorrowedReturnTransaction);
route.get('/search', [tokenVerified, adminOrDivision], searchPeminjamanPengembalianAsset);
route.get('/:id', [tokenVerified, adminOrDivision], getBorrowedReturnTransactionById);
route.post('/', [tokenVerified, adminOrDivision], tambahPeminjamanAsset);
route.put('/:id', [tokenVerified, adminOrDivision], pengembalianAsset);
route.get('/export/excel', [tokenVerified, adminOrDivision], exportBorrowedReturnTransactionToExcel);

module.exports = route;