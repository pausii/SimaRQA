const express = require('express');
const { getReportUtilitasAssets, getReportUtilitasAssetById, exportRuangAsetUtilitasToExcel, searchReportAsset } = require('../controllers/assetReportUtilitasController');

const { tokenVerified, onlyAdmin } = require('../middlewares/token');

const route = express.Router();

route.get('/', [tokenVerified, onlyAdmin], getReportUtilitasAssets);
route.get('/search', [tokenVerified, onlyAdmin], searchReportAsset);
route.get('/:id', [tokenVerified, onlyAdmin], getReportUtilitasAssetById);
route.get('/export/excel', [tokenVerified, onlyAdmin], exportRuangAsetUtilitasToExcel);
module.exports = route;