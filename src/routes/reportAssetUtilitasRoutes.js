const express = require('express');
const { getReportUtilitasAssets, getReportUtilitasAssetById, exportRuangAsetUtilitasToExcel, searchReportAsset } = require('../controllers/assetReportUtilitasController');

const { tokenVerified, onlyAdmin } = require('../middlewares/token');

const route = express.Router();

route.get('/report', [tokenVerified, onlyAdmin], getReportUtilitasAssets);
route.get('/report/search', [tokenVerified, onlyAdmin], searchReportAsset);
route.get('/report/:id', [tokenVerified, onlyAdmin], getReportUtilitasAssetById);
route.get('/report/export/excel', [tokenVerified, onlyAdmin], searchReportAsset);
module.exports = route;