const { RuangAsetAuditorium, CategoryAsset } = require('../models');
const QRCode = require('qrcode');
const generateAssetCode = require('../services/generateAssetCode');
const handlebars = require('handlebars');

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

        // Data struktur yang lebih rapi menggunakan handlebars
        const template = `
            Data Asset Ruang Auditorium dengan ID {{asset_id}}
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
            asset_id: auditorium.asset_id,
            asset_code: auditorium.asset_code,
            asset_name: auditorium.asset_name,
            category_id: auditorium.category_id,
            asset_price: auditorium.asset_price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }),
            purchase_date: auditorium.purchase_date.toISOString().split('T')[0],
            asset_type: auditorium.asset_type,
            last_maintenance_date: auditorium.last_maintenance_date ? auditorium.last_maintenance_date.toISOString().split('T')[0] : 'Belum Terdata'
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
        const safeAssetName = auditorium.asset_name.replace(/[^a-zA-Z0-9]/g, '_');
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