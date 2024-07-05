const express = require('express');
const { 
    createAuditoriumAsset,
    getAllAuditoriumAssets,
    getAuditoriumAssetById,
    updateAuditoriumAsset,
    deleteAuditoriumAsset,
    generateQRCode,
    searchAsset
 } = require('../controllers/assetRuangAuditoriumController');

const { tokenVerified, adminOrDivision } = require('../middlewares/token');

const route = express.Router();

route.get('/', [tokenVerified, adminOrDivision], getAllAuditoriumAssets);
route.get('/search', [tokenVerified, adminOrDivision], searchAsset);
route.get('/:id', [tokenVerified, adminOrDivision], getAuditoriumAssetById);
route.post('/', [tokenVerified, adminOrDivision], createAuditoriumAsset);
route.put('/:id', [tokenVerified, adminOrDivision], updateAuditoriumAsset);
route.delete('/:id', [tokenVerified, adminOrDivision], deleteAuditoriumAsset);
route.get('/:id/qrcode', [tokenVerified, adminOrDivision], generateQRCode);


module.exports = route;