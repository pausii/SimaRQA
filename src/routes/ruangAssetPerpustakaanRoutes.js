const express = require('express');
const { 
    createPerpustakaanAsset,
    getAllPerpustakaanAssets,
    getPerpustakaanAssetById,
    updatePerpustakaanAsset,
    deletePerpustakaanAsset,
    generateQRCode,
    searchAsset,
    getCountPerpustakaanAssets
 } = require('../controllers/assetRuangPerpustakaanController');

const { tokenVerified } = require('../middlewares/token');

const route = express.Router();

route.get('/', [tokenVerified], getAllPerpustakaanAssets);
route.get('/search', [tokenVerified], searchAsset);
route.get('/:id', [tokenVerified], getPerpustakaanAssetById);
route.post('/', [tokenVerified], createPerpustakaanAsset);
route.put('/:id', [tokenVerified], updatePerpustakaanAsset);
route.delete('/:id', [tokenVerified], deletePerpustakaanAsset);
route.get('/:id/qrcode', [tokenVerified], generateQRCode);


module.exports = route;