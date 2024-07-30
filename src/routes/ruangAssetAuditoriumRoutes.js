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

const { tokenVerified, forDivision } = require('../middlewares/token');

const route = express.Router();

route.get('/', [tokenVerified, forDivision], getAllAuditoriumAssets);
route.get('/search', [tokenVerified, forDivision], searchAsset);
route.get('/:id', [tokenVerified, forDivision], getAuditoriumAssetById);
route.post('/', [tokenVerified, forDivision], createAuditoriumAsset);
route.put('/:id', [tokenVerified, forDivision], updateAuditoriumAsset);
route.delete('/:id', [tokenVerified, forDivision], deleteAuditoriumAsset);
route.get('/:id/qrcode', [tokenVerified, forDivision], generateQRCode);


module.exports = route;