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

const { tokenVerified, forDivision } = require('../middlewares/token');

const route = express.Router();

route.get('/', [tokenVerified, forDivision], getAllUtilitasAssets);
route.get('/search', [tokenVerified, forDivision], searchAsset);
route.get('/:id', [tokenVerified, forDivision], getUtilitasAssetById);
route.post('/', [tokenVerified, forDivision], createUtilitasAsset);
route.put('/:id', [tokenVerified, forDivision], updateUtilitasAsset);
route.delete('/:id', [tokenVerified, forDivision], deleteUtilitasAsset);
route.get('/:id/qrcode', [tokenVerified, forDivision], generateQRCode);


module.exports = route;