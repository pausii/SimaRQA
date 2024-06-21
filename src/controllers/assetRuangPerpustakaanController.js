const { RuangAsetPerpustakaan } = require('../models');
const QRCode = require('qrcode');
const generateAssetCode = require('../services/generateAssetCode');
const fs = require('fs');
const path = require('path');

const createPerpustakaanAsset = async (req, res) => {
    try {
        const { asset_name, category_id, asset_price, purchase_date, asset_condition, asset_type, last_maintenance_date } = req.body;
        
        if (!asset_name || !category_id || !asset_price || !purchase_date || !asset_condition || !asset_type) {
            return res.status(400).json({ message: 'All Field is required'});
        }
        
        const assetCode = await generateAssetCode(RuangAsetPerpustakaan, 'LIB');
        
        const newAsset = await RuangAsetPerpustakaan.create({
            asset_code: assetCode, 
            asset_name,
            category_id,
            asset_price,
            purchase_date,
            asset_condition,
            asset_type,
            last_maintenance_date
        });

        res.status(201).json({
            message: 'Created Asset Perpustakaan Succesfully',
            data: newAsset
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

const getAllPerpustakaanAssets = async (req, res) => {
    try {
        const perpustakaanAssets = await RuangAsetPerpustakaan.findAll();
        res.status(200).json({
            message: 'Get all Asset perpustakaan successfully',
            data: perpustakaanAssets
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPerpustakaanAssetById = async (req, res) => {
    try {
        const perpustakaan = await RuangAsetPerpustakaan.findByPk(req.params.id);
        if (!perpustakaan) {
            return res.status(404).json({ message: 'Asset not found'});
        }
        res.status(200).json({
            message: `Get Asset perpustakaan Successfully at ID: ${id}`,
            data: perpustakaan
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updatePerpustakaanAsset = async (req, res) => {
    try {
        const { id } = req.params;
        const { asset_name, category_id, asset_price, purchase_date, asset_condition, asset_type, last_maintenance_date } = req.body;
        
        if (!id) {
            return res.status(400).json({ message: 'Asset ID is required'});
        }
        
        const library = await RuangAsetPerpustakaan.findByPk(id);
        if (!library) {
            return res.status(404).json({ message: 'Asset Perpustakaan not found'});
        }

        
        await library.update({
            asset_name: asset_name || library.asset_name,
            category_id: category_id || library.category_id,
            asset_price: asset_price || library.asset_price,
            purchase_date: purchase_date || library.purchase_date,
            asset_condition: asset_condition || library.asset_condition,
            asset_type: asset_type || library.asset_type,
            last_maintenance_date: last_maintenance_date || library.last_maintenance_date
        });

        res.status(200).json({
            message: `Updated Asset Perpustakaan Successfully at ID: ${id}`,
            data: library
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

const deletePerpustakaanAsset = async (req, res) => {
    try {
        const perpustakaan = await RuangAsetPerpustakaan.findByPk(req.params.id);
        if (!perpustakaan) {
            return res.status(404).json({ message: 'Asset not found'});
        }
        await perpustakaan.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const generateQRCode = async (req, res) => {
    try {
        const perpustakaan = await RuangAsetPerpustakaan.findByPk(req.params.id);
        if (!perpustakaan) {
            return res.status(404).json({ message: 'Asset not found'});
        }
        
        // Generate QR Code to a buffer
        const qrCodeBuffer = await QRCode.toBuffer(JSON.stringify(perpustakaan));

        // Set response headers
        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Content-Disposition', `attachment; filename="${perpustakaan.asset_name}_qr_code.png`);

        // Send the QR Code buffer as response
        res.send(qrCodeBuffer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const searchAsset = async (req, res) => {
    const { query } = req;

    try {
        const perpustakaan = await RuangAsetPerpustakaan.findAll();

        let filteredAssetPerpustakaan = perpustakaan;

        if (query.asset_code) {
            const searchTerm = query.asset_code.toLowerCase();
            filteredAssetPerpustakaan.filteredAssetPerpustakaan.filter(asset => asset.asset_code.toLowerCase().includes(searchTerm));
        }

        if (query.asset_name) {
            const searchTerm = query.asset_name.toLowerCase();
            filteredAssetPerpustakaan.filteredAssetPerpustakaan.filter(asset => asset.asset_name.toLowerCase().includes(searchTerm));
        }

        if (query.category_id) {
            const searchTerm = query.category_id.toLowerCase();
            filteredAssetPerpustakaan.filteredAssetPerpustakaan.filter(asset => asset.category_id.toLowerCase().includes(searchTerm));
        }

        if (query.asset_condition) {
            const searchTerm = query.asset_condition.toLowerCase();
            filteredAssetPerpustakaan.filteredAssetPerpustakaan.filter(asset => asset.asset_condition.toLowerCase().includes(searchTerm));
        }

        res.status(200).json(filteredAssetPerpustakaan);
    } catch (error) {
        console.error('Error Pencarian: ', error);
        res.status(500).json({ message: 'Internal Server error'});
    }
};

module.exports = {
    getAllPerpustakaanAssets,
    getPerpustakaanAssetById,
    createPerpustakaanAsset,
    updatePerpustakaanAsset,
    deletePerpustakaanAsset,
    generateQRCode,
    searchAsset
}