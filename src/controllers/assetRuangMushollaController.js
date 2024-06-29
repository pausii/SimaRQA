const { RuangAsetMusholla, CategoryAsset } = require('../models');
const QRCode = require('qrcode');
const generateAssetCode = require('../services/generateAssetCode');
const handlebars = require('handlebars');

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
        const mushollaAssets = await RuangAsetMusholla.findAll({
            include: [
                {
                    model: CategoryAsset,
                    as: "asset_category"
                }
            ]
        });
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
        const { id } = req.params;
        const musholla = await RuangAsetMusholla.findByPk(id, {
            include: [
                {
                    model: CategoryAsset,
                    as: "asset_category"
                }
            ]
        });
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

        // Data struktur yang lebih rapi menggunakan handlebars
        const template = `
            Data Asset Ruang Musholla dengan ID {{asset_id}}
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
            asset_id: musholla.asset_id,
            asset_code: musholla.asset_code,
            asset_name: musholla.asset_name,
            category_id: musholla.category_id,
            asset_price: musholla.asset_price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }),
            purchase_date: musholla.purchase_date.toISOString().split('T')[0],
            asset_type: musholla.asset_type,
            last_maintenance_date: musholla.last_maintenance_date ? musholla.last_maintenance_date.toISOString().split('T')[0] : 'Belum Terdata'
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
        const safeAssetName = musholla.asset_name.replace(/[^a-zA-Z0-9]/g, '_');
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