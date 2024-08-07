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

const { tokenVerified, forDivision, onlyAdmin } = require('../middlewares/token');

const route = express.Router();

route.get('/', [tokenVerified, forDivision, onlyAdmin], getAllMushollaAssets);
route.get('/search', [tokenVerified, forDivision, onlyAdmin], searchAsset);
route.get('/:id', [tokenVerified, forDivision, onlyAdmin], getMushollaAssetById);
route.post('/', [tokenVerified, forDivision, onlyAdmin], createMushollaAsset);
route.put('/:id', [tokenVerified, forDivision, onlyAdmin], updateMushollaAsset);
route.delete('/:id', [tokenVerified, forDivision, onlyAdmin], deleteMushollaAsset);
route.get('/:id/qrcode', [tokenVerified, forDivision, onlyAdmin], generateQRCode);


module.exports = route;