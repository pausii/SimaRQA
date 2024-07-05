const { RuangAsetMusholla, CategoryAsset } = require('../models');
const QRCode = require('qrcode');
const generateAssetCode = require('../services/generateAssetCode');
const handlebars = require('handlebars');

// Fungsi untuk membuat aset musholla
const createMushollaAsset = async (req, res) => {
    try {
        const { asset_name, category_id, asset_price, purchase_date, asset_condition, asset_type, last_maintenance_date } = req.body;

        // Validasi input
        if (!asset_name || !category_id || !asset_price || !purchase_date || !asset_condition || !asset_type) {
            return res.status(400).json({ message: 'Semua field wajib diisi.' });
        }

        // Generate kode aset unik
        const assetCode = await generateAssetCode(RuangAsetMusholla, 'MUS');

        // Buat aset baru
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

        return res.status(201).json({
            message: 'Aset Musholla berhasil ditambahkan.',
            data: newAsset
        });
    } catch (error) {
        console.error('Kesalahan menambahkan aset musholla:', error);
        return res.status(500).json({ message: 'Kesalahan server internal.' });
    }
};

// Fungsi untuk mendapatkan semua aset musholla
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

        if (mushollaAssets.length === 0) {
            return res.status(204).json({ message: 'Tidak ada aset musholla yang ditemukan.' });
        }

        return res.status(200).json({
            message: 'Berhasil mendapatkan semua aset musholla.',
            data: mushollaAssets
        });
    } catch (error) {
        console.error('Error mendapatkan aset musholla:', error);
        return res.status(500).json({ message: 'Kesalahan server internal.' });
    }
};

// Fungsi untuk mendapatkan aset musholla berdasarkan ID
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
            return res.status(404).json({ message: 'Aset musholla tidak ditemukan.' });
        }

        return res.status(200).json({
            message: `Berhasil mendapatkan aset musholla dengan ID: ${id}.`,
            data: musholla
        });
    } catch (error) {
        console.error(`Error mendapatkan aset musholla dengan ID ${id}:`, error);
        return res.status(500).json({ message: 'Kesalahan server internal.' });
    }
};

// Fungsi untuk memperbarui aset musholla
const updateMushollaAsset = async (req, res) => {
    try {
        const { id } = req.params;
        const { asset_name, category_id, asset_price, purchase_date, asset_condition, asset_type, last_maintenance_date } = req.body;

        const musholla = await RuangAsetMusholla.findByPk(id);
        if (!musholla) {
            return res.status(404).json({ message: 'Aset musholla tidak ditemukan.' });
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

        return res.status(200).json({
            message: `Aset musholla dengan ID ${id} berhasil diperbarui.`,
            data: musholla
        });
    } catch (error) {
        console.error(`Error memperbarui aset musholla dengan ID ${id}:`, error);
        return res.status(500).json({ message: 'Kesalahan server internal.' });
    }
};

// Fungsi untuk menghapus aset musholla
const deleteMushollaAsset = async (req, res) => {
    try {
        const { id } = req.params;
        const musholla = await RuangAsetMusholla.findByPk(id);

        if (!musholla) {
            return res.status(404).json({ message: 'Aset musholla tidak ditemukan.' });
        }

        await musholla.destroy();
        return res.status(204).send();
    } catch (error) {
        console.error(`Error menghapus aset musholla dengan ID ${id}:`, error);
        return res.status(500).json({ message: 'Kesalahan server internal.' });
    }
};

// Fungsi untuk menghasilkan QR Code untuk aset musholla
const generateQRCode = async (req, res) => {
    try {
        const musholla = await RuangAsetMusholla.findByPk(req.params.id);
        if (!musholla) {
            return res.status(404).json({ message: 'Aset musholla tidak ditemukan.' });
        }

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

        const safeAssetName = musholla.asset_name.replace(/[^a-zA-Z0-9]/g, '_');
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
        const mushollaAssets = await RuangAsetMusholla.findAll({
            include: [
                {
                    model: CategoryAsset,
                    as: "asset_category"
                }
            ]
        });

        const filteredAssets = mushollaAssets.filter(asset => {
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
            return res.status(404).json({ message: 'Tidak ada aset yang cocok dengan kriteria pencarian.' });
        }

        return res.status(200).json(filteredAssets);
    } catch (error) {
        console.error('Error pencarian aset:', error);
        return res.status(500).json({ message: 'Kesalahan server internal.' });
    }
};

module.exports = {
    createMushollaAsset,
    getAllMushollaAssets,
    getMushollaAssetById,
    updateMushollaAsset,
    deleteMushollaAsset,
    generateQRCode,
    searchAsset
};
