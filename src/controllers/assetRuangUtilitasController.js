const { RuangAsetUtilitas, CategoryAsset } = require('../models');
const QRCode = require('qrcode');
const generateAssetCode = require('../services/generateAssetCode');
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
        const utilitasAssets = await RuangAsetUtilitas.findAll({
            include: [
                {
                    model: CategoryAsset,
                    as: "asset_category"
                }
            ]
        });
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
        const { id } = req.params;
        const utilitas = await RuangAsetUtilitas.findByPk(id, {
            include: [
                {
                    model: CategoryAsset,
                    as: "asset_category"
                }
            ]
        });
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

        // Data struktur yang lebih rapi menggunakan handlebars
        const template = `
            Data Asset Ruang Utilitas dengan ID {{asset_id}}
            Kode Aset: {{asset_code}}
            Nama Aset: {{asset_name}}
            Kategori: {{category_id}}
            Harga Aset: Rp {{asset_price}}
            Tanggal Pembelian: {{purchase_date}}
            Kondisi Aset: {{asset_type}}
            Tanggal Terakhir Pemeliharaan: {{last_maintenance_date}}
        `;
        const compiledTemplate = handlebars.compile(template);
        const structuredData = compiledTemplate({
            asset_id: utilitas.asset_id,
            asset_code: utilitas.asset_code,
            asset_name: utilitas.asset_name,
            category_id: utilitas.category_id,
            asset_price: utilitas.asset_price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }),
            purchase_date: utilitas.purchase_date.toISOString().split('T')[0],
            asset_type: utilitas.asset_type,
            last_maintenance_date: utilitas.last_maintenance_date ? utilitas.last_maintenance_date.toISOString().split('T')[0] : 'Belum Terdata'
        });

        // Opsi tambahan untuk QR Code
        const options = {
            errorCorrectionLevel: 'H', // Error correction level: L, M, Q, H
            type: 'image/png',
            quality: 0.92,
            margin: 2,
            color: {
                dark: '#000000',  // Warna foreground
                light: '#FFFFFF'  // Warna background
            }
        };

        // Generate QR Code to a buffer with options
        const qrCodeBuffer = await QRCode.toBuffer(structuredData, options);

        // Menentukan nama file yang aman
        const safeAssetName = utilitas.asset_name.replace(/[^a-zA-Z0-9]/g, '_');
        const filename = `${safeAssetName}_qr_code.png`;

        // Set response headers
        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}`);

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