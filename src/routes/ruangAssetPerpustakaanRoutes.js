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

const { tokenVerified, forDivision, onlyAdmin } = require('../middlewares/token');

const route = express.Router();

route.get('/', [tokenVerified, forDivision, onlyAdmin], getAllPerpustakaanAssets);
route.get('/search', [tokenVerified, forDivision, onlyAdmin], searchAsset);
route.get('/:id', [tokenVerified, forDivision, onlyAdmin], getPerpustakaanAssetById);
route.post('/', [tokenVerified, forDivision, onlyAdmin], createPerpustakaanAsset);
route.put('/:id', [tokenVerified, forDivision, onlyAdmin], updatePerpustakaanAsset);
route.delete('/:id', [tokenVerified, forDivision, onlyAdmin], deletePerpustakaanAsset);
route.get('/:id/qrcode', [tokenVerified, forDivision, onlyAdmin], generateQRCode);


module.exports = route;