const express = require('express');
const { getAllReportAuditoriumAssets, getReportAuditoriumAssetById, exportRuangAsetAuditoriumToExcel, searchReportAsset } = require('../controllers/assetReportAuditoriumController');

const { tokenVerified, onlyAdmin } = require('../middlewares/token');

const route = express.Router();

route.get('/', [tokenVerified, onlyAdmin], getAllReportAuditoriumAssets);
route.get('/search', [tokenVerified, onlyAdmin], searchReportAsset);
route.get('/:id', [tokenVerified, onlyAdmin], getReportAuditoriumAssetById);
route.get('/export/excel', [tokenVerified, onlyAdmin], exportRuangAsetAuditoriumToExcel);

module.exports = route;