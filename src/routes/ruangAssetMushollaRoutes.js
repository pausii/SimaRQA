const express = require('express');
const { 
    createMushollaAsset,
    getAllMushollaAssets,
    getMushollaAssetById,
    updateMushollaAsset,
    deleteMushollaAsset,
    generateQRCode,
    searchAsset,
    getCountMushollaAssets
 } = require('../controllers/assetRuangMushollaController');

const { tokenVerified } = require('../middlewares/token');

const route = express.Router();

route.get('/', [tokenVerified], getAllMushollaAssets);
route.get('/search', [tokenVerified], searchAsset);
route.get('/:id', [tokenVerified], getMushollaAssetById);
route.post('/', [tokenVerified], createMushollaAsset);
route.put('/:id', [tokenVerified], updateMushollaAsset);
route.delete('/:id', [tokenVerified], deleteMushollaAsset);
route.get('/:id/qrcode', [tokenVerified], generateQRCode);


module.exports = route;