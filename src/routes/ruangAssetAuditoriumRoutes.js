const express = require('express');
const { 
    createAuditoriumAsset,
    getAllAuditoriumAssets,
    getAuditoriumAssetById,
    updateAuditoriumAsset,
    deleteAuditoriumAsset,
    generateQRCode,
    searchAsset,
    getCountAuditoriumAssets
 } = require('../controllers/assetRuangAuditoriumController');

const { tokenVerified } = require('../middlewares/token');

const route = express.Router();

route.get('/', [tokenVerified], getAllAuditoriumAssets);
route.get('/search', [tokenVerified], searchAsset);
route.get('/:id', [tokenVerified], getAuditoriumAssetById);
route.post('/', [tokenVerified], createAuditoriumAsset);
route.put('/:id', [tokenVerified], updateAuditoriumAsset);
route.delete('/:id', [tokenVerified], deleteAuditoriumAsset);
route.get('/:id/qrcode', [tokenVerified], generateQRCode);


module.exports = route;