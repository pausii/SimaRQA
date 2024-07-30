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

const { tokenVerified, forDivision } = require('../middlewares/token');

const route = express.Router();

route.get('/', [tokenVerified, forDivision], getAllMushollaAssets);
route.get('/search', [tokenVerified, forDivision], searchAsset);
route.get('/:id', [tokenVerified, forDivision], getMushollaAssetById);
route.post('/', [tokenVerified, forDivision], createMushollaAsset);
route.put('/:id', [tokenVerified, forDivision], updateMushollaAsset);
route.delete('/:id', [tokenVerified, forDivision], deleteMushollaAsset);
route.get('/:id/qrcode', [tokenVerified, forDivision], generateQRCode);


module.exports = route;