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

const { tokenVerified, forDivision, onlyAdmin } = require('../middlewares/token');

const route = express.Router();

route.get('/', [tokenVerified, forDivision, onlyAdmin], getAllAuditoriumAssets);
route.get('/search', [tokenVerified, forDivision, onlyAdmin], searchAsset);
route.get('/:id', [tokenVerified, forDivision, onlyAdmin], getAuditoriumAssetById);
route.post('/', [tokenVerified, forDivision, onlyAdmin], createAuditoriumAsset);
route.put('/:id', [tokenVerified, forDivision, onlyAdmin], updateAuditoriumAsset);
route.delete('/:id', [tokenVerified, forDivision, onlyAdmin], deleteAuditoriumAsset);
route.get('/:id/qrcode', [tokenVerified, forDivision, onlyAdmin], generateQRCode);


module.exports = route;