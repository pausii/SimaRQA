const express = require('express');
const { 
    createUtilitasAsset,
    getAllUtilitasAssets,
    getUtilitasAssetById,
    updateUtilitasAsset,
    deleteUtilitasAsset,
    generateQRCode,
    searchAsset,
    getCountUtilitasAssets
 } = require('../controllers/assetRuangUtilitasController');

const { tokenVerified, forDivision, onlyAdmin } = require('../middlewares/token');

const route = express.Router();

route.get('/', [tokenVerified, forDivision, onlyAdmin], getAllUtilitasAssets);
route.get('/search', [tokenVerified, forDivision, onlyAdmin], searchAsset);
route.get('/:id', [tokenVerified, forDivision, onlyAdmin], getUtilitasAssetById);
route.post('/', [tokenVerified, forDivision, onlyAdmin], createUtilitasAsset);
route.put('/:id', [tokenVerified, forDivision, onlyAdmin], updateUtilitasAsset);
route.delete('/:id', [tokenVerified, forDivision, onlyAdmin], deleteUtilitasAsset);
route.get('/:id/qrcode', [tokenVerified, forDivision, onlyAdmin], generateQRCode);


module.exports = route;