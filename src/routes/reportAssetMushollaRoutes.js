const express = require('express');
const { getReportMushollaAssets, getReportMushollaAssetById, exportRuangAsetMushollaToExcel, searchReportAsset } = require('../controllers/assetReportMushollaController');

const { tokenVerified, onlyAdmin } = require('../middlewares/token');

const route = express.Router();

route.get('/report', [tokenVerified, onlyAdmin], getReportMushollaAssets);
route.get('/report/search', [tokenVerified, onlyAdmin], searchReportAsset);
route.get('/report/:id', [tokenVerified, onlyAdmin], getReportMushollaAssetById);
route.get('/report/export/excel', [tokenVerified, onlyAdmin], exportRuangAsetMushollaToExcel);


module.exports = route;