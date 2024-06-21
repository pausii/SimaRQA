const express = require('express');
const { getReportAuditoriumAssets, getReportAuditoriumAssetById, exportRuangAsetAuditoriumToExcel, searchReportAsset } = require('../controllers/assetReportAuditoriumController');

const { tokenVerified, onlyAdmin } = require('../middlewares/token');

const route = express.Router();

route.get('/report', [tokenVerified, onlyAdmin], getReportAuditoriumAssets);
route.get('/report/search', [tokenVerified, onlyAdmin], searchReportAsset);
route.get('/report/:id', [tokenVerified, onlyAdmin], getReportAuditoriumAssetById);
route.get('/report/export/excel', [tokenVerified, onlyAdmin], exportRuangAsetAuditoriumToExcel);

module.exports = route;