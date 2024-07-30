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

const { tokenVerified, forDivision } = require('../middlewares/token');

const route = express.Router();

route.get('/', [tokenVerified, forDivision], getAllPerpustakaanAssets);
route.get('/search', [tokenVerified, forDivision], searchAsset);
route.get('/:id', [tokenVerified, forDivision], getPerpustakaanAssetById);
route.post('/', [tokenVerified, forDivision], createPerpustakaanAsset);
route.put('/:id', [tokenVerified, forDivision], updatePerpustakaanAsset);
route.delete('/:id', [tokenVerified, forDivision], deletePerpustakaanAsset);
route.get('/:id/qrcode', [tokenVerified, forDivision], generateQRCode);


module.exports = route;