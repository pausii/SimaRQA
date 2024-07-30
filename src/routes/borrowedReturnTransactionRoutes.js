const express = require('express');

const { 
    getAllBorrowedReturnTransaction,
    getBorrowedReturnTransactionById,
    tambahPeminjamanAsset,
    pengembalianAsset,
    exportBorrowedReturnTransactionToExcel,
    searchPeminjamanPengembalianAsset
} = require('../controllers/borrowedReturnTransactionController');

const { tokenVerified, forDivision } = require('../middlewares/token');

const route = express.Router();

route.get('/', [tokenVerified, forDivision], getAllBorrowedReturnTransaction);
route.get('/search', [tokenVerified, forDivision], searchPeminjamanPengembalianAsset);
route.get('/:id', [tokenVerified, forDivision], getBorrowedReturnTransactionById);
route.post('/', [tokenVerified, forDivision], tambahPeminjamanAsset);
route.put('/:id', [tokenVerified, forDivision], pengembalianAsset);
route.get('/export/excel', [tokenVerified, forDivision], exportBorrowedReturnTransactionToExcel);

module.exports = route;