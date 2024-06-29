const express = require('express');
const { getAllReportAuditoriumAssets, getReportAuditoriumAssetById, exportRuangAsetAuditoriumToExcel, searchReportAsset } = require('../controllers/assetReportAuditoriumController');

const { tokenVerified, onlyAdmin } = require('../middlewares/token');

const route = express.Router();

route.get('/reports/', [tokenVerified, onlyAdmin], getAllReportAuditoriumAssets);
route.get('/reports/search', [tokenVerified, onlyAdmin], searchReportAsset);
route.get('/reports/:id', [tokenVerified, onlyAdmin], getReportAuditoriumAssetById);
route.get('/reports/export/excel', [tokenVerified, onlyAdmin], exportRuangAsetAuditoriumToExcel);

module.exports = route;