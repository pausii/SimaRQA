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

const { tokenVerified, adminOrDivision } = require('../middlewares/token');

const route = express.Router();

route.get('/', [tokenVerified, adminOrDivision], getAllMushollaAssets);
route.get('/stats', [tokenVerified, adminOrDivision], getCountMushollaAssets);
route.get('/search', [tokenVerified, adminOrDivision], searchAsset);
route.get('/:id', [tokenVerified, adminOrDivision], getMushollaAssetById);
route.post('/', [tokenVerified, adminOrDivision], createMushollaAsset);
route.put('/:id', [tokenVerified, adminOrDivision], updateMushollaAsset);
route.delete('/:id', [tokenVerified, adminOrDivision], deleteMushollaAsset);
route.get('/:id/qrcode', [tokenVerified, adminOrDivision], generateQRCode);


module.exports = route;