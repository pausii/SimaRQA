const { RuangAsetUtilitas } = require('../models');
const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

const createUtilitasAsset = async (req, res) => {
    try {
        const { asset_name, category_id, asset_price, purchase_date, asset_condition, asset_type, last_maintenance_date } = req.body;
        
        if (!asset_name || !category_id || !asset_price || !purchase_date || !asset_condition || !asset_type) {
            return res.status(400).json({ message: 'All Field is required'});
        }
        
        const assetCode = await generateAssetCode(RuangAsetUtilitas, 'UTI');
        
        const newAsset = await RuangAsetUtilitas.create({
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
            message: 'Created Asset Utilitas Succesfully',
            data: newAsset
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

const getAllUtilitasAssets = async (req, res) => {
    try {
        const utilitasAssets = await RuangAsetUtilitas.findAll();
        res.status(200).json({
            message: 'Get all Asset utilitas successfully',
            data: utilitasAssets
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUtilitasAssetById = async (req, res) => {
    try {
        const utilitas = await RuangAsetUtilitas.findByPk(req.params.id);
        if (!utilitas) {
            return res.status(404).json({ message: 'Asset not found'});
        }
        res.status(200).json({
            message: `Get Asset utilitas Successfully at ID: ${id}`,
            data: utilitas
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateUtilitasAsset = async (req, res) => {
    try {
        const { id } = req.params;
        const { asset_name, category_id, asset_price, purchase_date, asset_condition, asset_type, last_maintenance_date } = req.body;
        
        if (!id) {
            return res.status(400).json({ message: 'Asset ID is required'});
        }
        
        const utilitas = await RuangAsetUtilitas.findByPk(id);
        if (!utilitas) {
            return res.status(404).json({ message: 'Asset Utilitas not found'});
        }

        
        await utilitas.update({
            asset_name: asset_name || utilitas.asset_name,
            category_id: category_id || utilitas.category_id,
            asset_price: asset_price || utilitas.asset_price,
            purchase_date: purchase_date || utilitas.purchase_date,
            asset_condition: asset_condition || utilitas.asset_condition,
            asset_type: asset_type || utilitas.asset_type,
            last_maintenance_date: last_maintenance_date || utilitas.last_maintenance_date
        });

        res.status(200).json({
            message: `Updated Asset Utilitas Successfully at ID: ${id}`,
            data: utilitas
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

const deleteUtilitasAsset = async (req, res) => {
    try {
        const utilitas = await RuangAsetUtilitas.findByPk(req.params.id);
        if (!utilitas) {
            return res.status(404).json({ message: 'Asset not found'});
        }
        await utilitas.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const generateQRCode = async (req, res) => {
    try {
        const utilitas = await RuangAsetUtilitas.findByPk(req.params.id);
        if (!utilitas) {
            return res.status(404).json({ message: 'Asset not found' });
        }

        // Generate QR Code to a buffer
        const qrCodeBuffer = await QRCode.toBuffer(JSON.stringify(utilitas));

        // Set response headers
        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Content-Disposition', `attachment; filename="${utilitas.asset_name}_qr_code.png"`);

        // Send the QR Code buffer as response
        res.send(qrCodeBuffer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const searchAsset = async (req, res) => {
    const { query } = req;

    try {
        const utilitas = await RuangAsetUtilitas.findAll();

        let filteredAssetUtilitas = utilitas;

        if (query.asset_code) {
            const searchTerm = query.asset_code.toLowerCase();
            filteredAssetUtilitas.filteredAssetUtilitas.filter(asset => asset.asset_code.toLowerCase().includes(searchTerm));
        }

        if (query.asset_name) {
            const searchTerm = query.asset_name.toLowerCase();
            filteredAssetUtilitas.filteredAssetUtilitas.filter(asset => asset.asset_name.toLowerCase().includes(searchTerm));
        }

        if (query.category_id) {
            const searchTerm = query.category_id.toLowerCase();
            filteredAssetUtilitas.filteredAssetUtilitas.filter(asset => asset.category_id.toLowerCase().includes(searchTerm));
        }

        if (query.asset_condition) {
            const searchTerm = query.asset_condition.toLowerCase();
            filteredAssetUtilitas.filteredAssetUtilitas.filter(asset => asset.asset_condition.toLowerCase().includes(searchTerm));
        }

        res.status(200).json(filteredAssetUtilitas);
    } catch (error) {
        console.error('Error Pencarian: ', error);
        res.status(500).json({ message: 'Internal Server error'});
    }
};



module.exports = {
    getAllUtilitasAssets,
    getUtilitasAssetById,
    createUtilitasAsset,
    updateUtilitasAsset,
    deleteUtilitasAsset,
    generateQRCode,
    searchAsset
}