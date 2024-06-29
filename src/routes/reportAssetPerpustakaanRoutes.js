const express = require('express');
const { getReportPerpustakaanAssets, getReportPerpustakaanAssetById, exportRuangAsetPerpustakaanToExcel, searchReportAsset } = require('../controllers/assetReportPerpustakaanController');

const { tokenVerified, onlyAdmin } = require('../middlewares/token');

const route = express.Router();

route.get('/report', [tokenVerified, onlyAdmin], getReportPerpustakaanAssets);
route.get('/report/search', [tokenVerified, onlyAdmin], searchReportAsset);
route.get('/report/:id', [tokenVerified, onlyAdmin], getReportPerpustakaanAssetById);
route.get('/report/export/excel', /*[tokenVerified, onlyAdmin]*/ exportRuangAsetPerpustakaanToExcel);

module.exports = route;