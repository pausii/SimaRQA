const express = require('express');
const { 
    getAllReportPerpustakaanAssets,
    getReportPerpustakaanAssetById,
    exportRuangAsetPerpustakaanToExcel,
    searchReportAsset
 } = require('../controllers/assetReportPerpustakaanController');

const { tokenVerified, onlyAdmin } = require('../middlewares/token');

const route = express.Router();

route.get('/', [tokenVerified, onlyAdmin], getAllReportPerpustakaanAssets);
route.get('/search', [tokenVerified, onlyAdmin], searchReportAsset);
route.get('/:id', [tokenVerified, onlyAdmin], getReportPerpustakaanAssetById);
route.get('/export/excel', /*[tokenVerified, onlyAdmin]*/ exportRuangAsetPerpustakaanToExcel);

module.exports = route;