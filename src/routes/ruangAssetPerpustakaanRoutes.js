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

const { tokenVerified, adminOrDivision } = require('../middlewares/token');

const route = express.Router();

route.get('/', [tokenVerified, adminOrDivision], getAllPerpustakaanAssets);
route.get('/stats', [tokenVerified, adminOrDivision], getCountPerpustakaanAssets);
route.get('/search', [tokenVerified, adminOrDivision], searchAsset);
route.get('/:id', [tokenVerified, adminOrDivision], getPerpustakaanAssetById);
route.post('/', [tokenVerified, adminOrDivision], createPerpustakaanAsset);
route.put('/:id', [tokenVerified, adminOrDivision], updatePerpustakaanAsset);
route.delete('/:id', [tokenVerified, adminOrDivision], deletePerpustakaanAsset);
route.get('/:id/qrcode', [tokenVerified, adminOrDivision], generateQRCode);


module.exports = route;