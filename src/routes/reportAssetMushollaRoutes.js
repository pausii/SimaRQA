const express = require('express');
const { 
    getAllReportMushollaAsset,
    getReportMushollaAssetById,
    exportRuangAsetMushollaToExcel,
    searchReportAsset
 } = require('../controllers/assetReportMushollaController');

const { tokenVerified, onlyAdmin } = require('../middlewares/token');

const route = express.Router();

route.get('/', [tokenVerified, onlyAdmin], getAllReportMushollaAsset);
route.get('/search', [tokenVerified, onlyAdmin], searchReportAsset);
route.get('/:id', [tokenVerified, onlyAdmin], getReportMushollaAssetById);
route.get('/export/excel', [tokenVerified, onlyAdmin], exportRuangAsetMushollaToExcel);


module.exports = route;