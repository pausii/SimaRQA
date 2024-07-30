const express = require('express');

const { 
    getAllRequestRepair,
    getRequestRepairById,
    tambahPermohonanPerbaikanAsset,
    konfirmasiPerbaikanAsset,
    exportRequestRepairToExcel,
    searchPermohonanKerusakanAsset,
} = require('../controllers/requestRepairDamageController');


const { tokenVerified, forDivision, onlyAdmin, adminOrDivision } = require('../middlewares/token');

const route = express.Router();

route.get('/', [tokenVerified, adminOrDivision], getAllRequestRepair);
route.get('/search', [tokenVerified, adminOrDivision], searchPermohonanKerusakanAsset);
route.get('/:id', [tokenVerified, adminOrDivision], getRequestRepairById);
route.post('/', [tokenVerified, forDivision], tambahPermohonanPerbaikanAsset);
route.put('/:id', [tokenVerified, onlyAdmin], konfirmasiPerbaikanAsset);
route.get('/export/excel', [tokenVerified, adminOrDivision], exportRequestRepairToExcel);

module.exports = route;