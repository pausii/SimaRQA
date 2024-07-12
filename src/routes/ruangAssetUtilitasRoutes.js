const express = require('express');
const { 
    createUtilitasAsset,
    getAllUtilitasAssets,
    getUtilitasAssetById,
    updateUtilitasAsset,
    deleteUtilitasAsset,
    generateQRCode,
    searchAsset,
    getCountUtilitasAssets
 } = require('../controllers/assetRuangUtilitasController');

const { tokenVerified, adminOrDivision } = require('../middlewares/token');

const route = express.Router();

route.get('/', [tokenVerified, adminOrDivision], getAllUtilitasAssets);
route.get('/stats', [tokenVerified, adminOrDivision], getCountUtilitasAssets);
route.get('/search', [tokenVerified, adminOrDivision], searchAsset);
route.get('/:id', [tokenVerified, adminOrDivision], getUtilitasAssetById);
route.post('/', [tokenVerified, adminOrDivision], createUtilitasAsset);
route.put('/:id', [tokenVerified, adminOrDivision], updateUtilitasAsset);
route.delete('/:id', [tokenVerified, adminOrDivision], deleteUtilitasAsset);
route.get('/:id/qrcode', [tokenVerified, adminOrDivision], generateQRCode);


module.exports = route;