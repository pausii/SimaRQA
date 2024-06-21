const { RuangAsetMusholla } = require('../models');
const QRCode = require('qrcode');
const generateAssetCode = require('../services/generateAssetCode');
const fs = require('fs');
const path = require('path');

const createMushollaAsset = async (req, res) => {
    try {
        const { asset_name, category_id, asset_price, purchase_date, asset_condition, asset_type, last_maintenance_date } = req.body;
        
        if (!asset_name || !category_id || !asset_price || !purchase_date || !asset_condition || !asset_type) {
            return res.status(400).json({ message: 'All Field is required'});
        }
        
        const assetCode = await generateAssetCode(RuangAsetMusholla, 'MUS');
        
        const newAsset = await RuangAsetMusholla.create({
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
            message: 'Created Asset Musholla Succesfully',
            data: newAsset
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

const getAllMushollaAssets = async (req, res) => {
    try {
        const mushollaAssets = await RuangAsetMusholla.findAll();
        res.status(200).json({
            message: 'Get all Asset Musholla successfully',
            data: mushollaAssets
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMushollaAssetById = async (req, res) => {
    try {
        const musholla = await RuangAsetMusholla.findByPk(req.params.id);
        if (!musholla) {
            return res.status(404).json({ message: 'Asset not found'});
        }
        res.status(200).json({
            message: `Get Asset Musholla Successfully at ID: ${id}`,
            data: musholla
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateMushollaAsset = async (req, res) => {
    try {
        const { id } = req.params;
        const { asset_name, category_id, asset_price, purchase_date, asset_condition, asset_type, last_maintenance_date } = req.body;
        
        if (!id) {
            return res.status(400).json({ message: 'Asset ID is required'});
        }
        
        const musholla = await RuangAsetMusholla.findByPk(id);
        if (!musholla) {
            return res.status(404).json({ message: 'Asset Musholla not found'});
        }

        
        await musholla.update({
            asset_name: asset_name || musholla.asset_name,
            category_id: category_id || musholla.category_id,
            asset_price: asset_price || musholla.asset_price,
            purchase_date: purchase_date || musholla.purchase_date,
            asset_condition: asset_condition || musholla.asset_condition,
            asset_type: asset_type || musholla.asset_type,
            last_maintenance_date: last_maintenance_date || musholla.last_maintenance_date
        });

        res.status(200).json({
            message: `Updated Asset Musholla Successfully at ID: ${id}`,
            data: musholla
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}


const deleteMushollaAsset = async (req, res) => {
    try {
        const musholla = await RuangAsetMusholla.findByPk(req.params.id);
        if (!musholla) {
            return res.status(404).json({ message: 'Asset not found'});
        }
        await musholla.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const generateQRCode = async (req, res) => {
    try {
        const musholla = await RuangAsetMusholla.findByPk(req.params.id);
        if (!musholla) {
            return res.status(404).json({ message: 'Asset not found'});
        }
        
        // Generate QR Code to a buffer
        const qrCodeBuffer = await QRCode.toBuffer(JSON.stringify(musholla));

        // Set response headers
        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Content-Disposition', `attachment; filename="${musholla.asset_name}_qr_code.png`);

        // Send the QR Code buffer as response
        res.send(qrCodeBuffer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const searchAsset = async (req, res) => {
    const { query } = req;

    try {
        const musholla = await RuangAsetMusholla.findAll();

        let filteredAssetMusholla = musholla;

        if (query.asset_code) {
            const searchTerm = query.asset_code.toLowerCase();
            filteredAssetMusholla.filteredAssetMusholla.filter(asset => asset.asset_code.toLowerCase().includes(searchTerm));
        }

        if (query.asset_name) {
            const searchTerm = query.asset_name.toLowerCase();
            filteredAssetMusholla.filteredAssetMusholla.filter(asset => asset.asset_name.toLowerCase().includes(searchTerm));
        }

        if (query.category_id) {
            const searchTerm = query.category_id.toLowerCase();
            filteredAssetMusholla.filteredAssetMusholla.filter(asset => asset.category_id.toLowerCase().includes(searchTerm));
        }

        if (query.asset_condition) {
            const searchTerm = query.asset_condition.toLowerCase();
            filteredAssetMusholla.filteredAssetMusholla.filter(asset => asset.asset_condition.toLowerCase().includes(searchTerm));
        }

        res.status(200).json(filteredAssetMusholla);
    } catch (error) {
        console.error('Error Pencarian: ', error);
        res.status(500).json({ message: 'Internal Server error'});
    }
};

module.exports = {
    getAllMushollaAssets,
    getMushollaAssetById,
    createMushollaAsset,
    updateMushollaAsset,
    deleteMushollaAsset,
    generateQRCode,
    searchAsset
}