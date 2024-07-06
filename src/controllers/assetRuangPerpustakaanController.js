const { RuangAsetPerpustakaan, CategoryAsset } = require('../models');
const QRCode = require('qrcode');
const generateAssetCode = require('../services/generateAssetCode');
const handlebars = require('handlebars');

// Fungsi untuk membuat aset perpustakaan
const createPerpustakaanAsset = async (req, res) => {
    try {
        const { asset_name, category_id, asset_price, purchase_date, asset_condition, asset_type, last_maintenance_date } = req.body;

        // Validasi input
        if (!asset_name || !category_id || !asset_price || !purchase_date || !asset_condition || !asset_type) {
            return res.status(400).json({ message: 'Data tidak sesuai, mohon cek kembali.' });
        }

        // Generate kode aset unik
        const assetCode = await generateAssetCode(RuangAsetPerpustakaan, 'LIB');

        // Buat aset baru
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

        return res.status(201).json({
            message: 'Data aset perpustakaan berhasil ditambahkan.',
            data: newAsset
        });
    } catch (error) {
        console.error('Kesalahan menambahkan aset perpustakaan:', error);
        return res.status(500).json({ message: 'Kesalahan server internal.' });
    }
};

// Fungsi untuk mendapatkan semua aset perpustakaan
const getAllPerpustakaanAssets = async (req, res) => {
    try {
        const perpustakaanAssets = await RuangAsetPerpustakaan.findAll({
            include: [
                {
                    model: CategoryAsset,
                    as: "asset_category"
                }
            ]
        });

        if (perpustakaanAssets.length === 0) {
            return res.status(204).json({ message: 'Tidak ada aset perpustakaan yang ditemukan.' });
        }

        return res.status(200).json({
            message: 'Berhasil mendapatkan semua aset perpustakaan.',
            data: perpustakaanAssets
        });
    } catch (error) {
        console.error('Error mendapatkan aset perpustakaan:', error);
        return res.status(500).json({ message: 'Kesalahan server internal.' });
    }
};

// Fungsi untuk mendapatkan aset perpustakaan berdasarkan ID
const getPerpustakaanAssetById = async (req, res) => {
    try {
        const { id } = req.params;
        const perpustakaan = await RuangAsetPerpustakaan.findByPk(id, {
            include: [
                {
                    model: CategoryAsset,
                    as: "asset_category"
                }
            ]
        });

        if (!perpustakaan) {
            return res.status(404).json({ message: 'Aset perpustakaan tidak ditemukan.' });
        }

        return res.status(200).json({
            message: `Berhasil mendapatkan aset perpustakaan dengan ID: ${id}.`,
            data: perpustakaan
        });
    } catch (error) {
        console.error(`Error mendapatkan aset perpustakaan dengan ID ${id}:`, error);
        return res.status(500).json({ message: 'Kesalahan server internal.' });
    }
};

// Fungsi untuk memperbarui aset perpustakaan
const updatePerpustakaanAsset = async (req, res) => {
    try {
        const { id } = req.params;
        const { asset_name, category_id, asset_price, purchase_date, asset_condition, asset_type, last_maintenance_date } = req.body;

        const perpustakaan = await RuangAsetPerpustakaan.findByPk(id);
        if (!perpustakaan) {
            return res.status(404).json({ message: 'Aset perpustakaan tidak ditemukan.' });
        }

        await perpustakaan.update({
            asset_name: asset_name || perpustakaan.asset_name,
            category_id: category_id || perpustakaan.category_id,
            asset_price: asset_price || perpustakaan.asset_price,
            purchase_date: purchase_date || perpustakaan.purchase_date,
            asset_condition: asset_condition || perpustakaan.asset_condition,
            asset_type: asset_type || perpustakaan.asset_type,
            last_maintenance_date: last_maintenance_date || perpustakaan.last_maintenance_date
        });

        return res.status(200).json({
            message: `Aset perpustakaan dengan ID ${id} berhasil diperbarui.`,
            data: perpustakaan
        });
    } catch (error) {
        console.error(`Error memperbarui aset perpustakaan dengan ID ${id}:`, error);
        return res.status(500).json({ message: 'Kesalahan server internal.' });
    }
};

// Fungsi untuk menghapus aset perpustakaan
const deletePerpustakaanAsset = async (req, res) => {
    try {
        const { id } = req.params;
        const perpustakaan = await RuangAsetPerpustakaan.findByPk(id);

        if (!perpustakaan) {
            return res.status(404).json({ message: 'Aset perpustakaan tidak ditemukan.' });
        }

        await perpustakaan.destroy();
        return res.status(200).json({
            message: 'Data aset perpustakaan berhasil dihapus'
        });
    } catch (error) {
        console.error(`Error menghapus aset perpustakaan dengan ID ${id}:`, error);
        return res.status(500).json({ message: 'Kesalahan server internal.' });
    }
};

// Fungsi untuk menghasilkan QR Code untuk aset perpustakaan
const generateQRCode = async (req, res) => {
    try {
        const perpustakaan = await RuangAsetPerpustakaan.findByPk(req.params.id);
        if (!perpustakaan) {
            return res.status(404).json({ message: 'Aset perpustakaan tidak ditemukan.' });
        }

        const template = `
            Data Asset Ruang Perpustakaan dengan ID {{asset_id}}
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
            asset_id: perpustakaan.asset_id,
            asset_code: perpustakaan.asset_code,
            asset_name: perpustakaan.asset_name,
            category_id: perpustakaan.category_id,
            asset_price: perpustakaan.asset_price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }),
            purchase_date: perpustakaan.purchase_date.toISOString().split('T')[0],
            asset_type: perpustakaan.asset_type,
            last_maintenance_date: perpustakaan.last_maintenance_date ? perpustakaan.last_maintenance_date.toISOString().split('T')[0] : 'Belum Terdata'
        });

        const options = {
            errorCorrectionLevel: 'H',
            type: 'image/png',
            quality: 0.92,
            margin: 2,
            color: {
                dark: '#000000',
                light: '#FFFFFF'
            }
        };

        const qrCodeBuffer = await QRCode.toBuffer(structuredData, options);

        const safeAssetName = perpustakaan.asset_name.replace(/[^a-zA-Z0-9]/g, '_');
        const filename = `${safeAssetName}_qr_code.png`;

        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        return res.send(qrCodeBuffer);
    } catch (error) {
        console.error('Error generating QR Code:', error);
        return res.status(500).json({ message: 'Kesalahan server internal.' });
    }
};

// Fungsi untuk mencari aset berdasarkan query
const searchAsset = async (req, res) => {
    try {
        const { query } = req;
        const perpustakaanAssets = await RuangAsetPerpustakaan.findAll({
            include: [
                {
                    model: CategoryAsset,
                    as: "asset_category"
                }
            ]
        });

        const filteredAssets = perpustakaanAssets.filter(asset => {
            let matches = true;

            if (query.asset_code) {
                matches = matches && asset.asset_code.toLowerCase().includes(query.asset_code.toLowerCase());
            }

            if (query.asset_name) {
                matches = matches && asset.asset_name.toLowerCase().includes(query.asset_name.toLowerCase());
            }

            return matches;
        });

        if (filteredAssets.length === 0) {
            return res.status(404).json({ message: 'Data tidak ditemukan.' });
        }

        return res.status(200).json(filteredAssets);
    } catch (error) {
        console.error('Error pencarian aset:', error);
        return res.status(500).json({ message: 'Kesalahan server internal.' });
    }
};

module.exports = {
    createPerpustakaanAsset,
    getAllPerpustakaanAssets,
    getPerpustakaanAssetById,
    updatePerpustakaanAsset,
    deletePerpustakaanAsset,
    generateQRCode,
    searchAsset
};
