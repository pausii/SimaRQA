const { RuangAsetAuditorium, CategoryAsset } = require('../models');
const QRCode = require('qrcode');
const generateAssetCode = require('../services/generateAssetCode');
const fs = require('fs');
const path = require('path');

const createAuditoriumAsset = async (req, res) => {
    try {
        const { asset_name, category_id, asset_price, purchase_date, asset_condition, asset_type, last_maintenance_date } = req.body;
        
        if (!asset_name || !category_id || !asset_price || !purchase_date || !asset_condition || !asset_type) {
            return res.status(400).json({ message: 'All Field is required'});
        }
        
        const assetCode = await generateAssetCode(RuangAsetAuditorium, 'AUD');
        
        const newAsset = await RuangAsetAuditorium.create({
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
            message: 'Created Asset auditorium Succesfully',
            data: newAsset
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

const getAllAuditoriumAssets = async (req, res) => {
    try {
        const auditoriumAssets = await RuangAsetAuditorium.findAll({
            include: [
                {
                    model: CategoryAsset,
                    as: "asset_category"
                }
            ]
        });
        res.status(200).json({
            message: 'Get all Asset auditorium successfully',
            data: auditoriumAssets
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAuditoriumAssetById = async (req, res) => {
    try {
        const { id } = req.params;
        const auditorium = await RuangAsetAuditorium.findByPk(id, ({
            include: [
                {
                    model: CategoryAsset,
                    as: "asset_category"
                }
            ]
        }));
        if (!auditorium) {
            return res.status(404).json({ message: 'Asset not found'});
        }
        res.status(200).json({
            message: `Get Asset auditorium Successfully at ID: ${id}`,
            data: auditorium
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateAuditoriumAsset = async (req, res) => {
    try {
        const { id } = req.params;
        const { asset_name, category_id, asset_price, purchase_date, asset_condition, asset_type, last_maintenance_date } = req.body;
        
        if (!id) {
            return res.status(400).json({ message: 'Asset ID is required'});
        }
        
        const auditorium = await RuangAsetAuditorium.findByPk(id);
        if (!auditorium) {
            return res.status(404).json({ message: 'Asset Auditorium not found'});
        }

        
        await auditorium.update({
            asset_name: asset_name || auditorium.asset_name,
            category_id: category_id || auditorium.category_id,
            asset_price: asset_price || auditorium.asset_price,
            purchase_date: purchase_date || auditorium.purchase_date,
            asset_condition: asset_condition || auditorium.asset_condition,
            asset_type: asset_type || auditorium.asset_type,
            last_maintenance_date: last_maintenance_date || auditorium.last_maintenance_date
        });

        res.status(200).json({
            message: `Updated Asset auditorium Successfully at ID: ${id}`,
            data: auditorium
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

const deleteAuditoriumAsset = async (req, res) => {
    try {
        const auditorium = await RuangAsetAuditorium.findByPk(req.params.id);
        if (!auditorium) {
            return res.status(404).json({ message: 'Asset not found'});
        }
        await auditorium.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const generateQRCode = async (req, res) => {
    try {
        const auditorium = await RuangAsetAuditorium.findByPk(req.params.id);
        if (!auditorium) {
            return res.status(404).json({ message: 'Asset not found'});
        }

        const structuredData = {
            "ID Aset": auditorium.asset_id,
            "Kode Aset": auditorium.asset_code,
            "Nama Aset": auditorium.asset_name,
            "Kategori": auditorium.category_id
        }
        
        // Generate QR Code to a buffer
        const qrCodeBuffer = await QRCode.toBuffer(JSON.stringify(auditorium));

        // Set response headers
        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Content-Disposition', `attachment; filename="${auditorium.asset_name}_qr_code.png`);

        // Send the QR Code buffer as response
        res.send(qrCodeBuffer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const searchAsset = async (req, res) => {
    const { query } = req;

    try {
        const auditorium = await RuangAsetAuditorium.findAll();

        let filteredAssetAuditorium = auditorium;

        if (query.asset_code) {
            const searchTerm = query.asset_code.toLowerCase();
            filteredAssetAuditorium.filteredAssetAuditorium.filter(asset => asset.asset_code.toLowerCase().includes(searchTerm));
        }

        if (query.asset_name) {
            const searchTerm = query.asset_name.toLowerCase();
            filteredAssetAuditorium.filteredAssetAuditorium.filter(asset => asset.asset_name.toLowerCase().includes(searchTerm));
        }

        if (query.category_id) {
            const searchTerm = query.category_id.toLowerCase();
            filteredAssetAuditorium.filteredAssetAuditorium.filter(asset => asset.category_id.toLowerCase().includes(searchTerm));
        }

        if (query.asset_condition) {
            const searchTerm = query.asset_condition.toLowerCase();
            filteredAssetAuditorium.filteredAssetAuditorium.filter(asset => asset.asset_condition.toLowerCase().includes(searchTerm));
        }

        res.status(200).json(filteredAssetAuditorium);
    } catch (error) {
        console.error('Error Pencarian: ', error);
        res.status(500).json({ message: 'Internal Server error'});
    }
};

module.exports = {
    getAllAuditoriumAssets,
    getAuditoriumAssetById,
    createAuditoriumAsset,
    updateAuditoriumAsset,
    deleteAuditoriumAsset,
    generateQRCode,
    searchAsset
}