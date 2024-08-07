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

const { tokenVerified } = require('../middlewares/token');

const route = express.Router();

route.get('/', [tokenVerified], getAllUtilitasAssets);
route.get('/search', [tokenVerified], searchAsset);
route.get('/:id', [tokenVerified], getUtilitasAssetById);
route.post('/', [tokenVerified], createUtilitasAsset);
route.put('/:id', [tokenVerified], updateUtilitasAsset);
route.delete('/:id', [tokenVerified], deleteUtilitasAsset);
route.get('/:id/qrcode', [tokenVerified], generateQRCode);


module.exports = route;