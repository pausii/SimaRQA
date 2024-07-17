const { RuangAsetAuditorium, CategoryAsset } = require('../models');
const QRCode = require('qrcode');
const generateAssetCode = require('../services/generateAssetCode');
const handlebars = require('handlebars');

// Fungsi untuk membuat aset auditorium
const createAuditoriumAsset = async (req, res) => {
    try {
        const { asset_name, category_id, asset_price, purchase_date, asset_condition, asset_type, last_maintenance_date } = req.body;

        // Validasi input
        if (!asset_name || !category_id || !asset_price || !purchase_date || !asset_condition || !asset_type) {
            return res.status(400).json({ message: 'Data tidak sesuai, mohon cek kembali.' });
        }

        // Generate kode aset unik
        const assetCode = await generateAssetCode(RuangAsetAuditorium, 'AUD');

        // Buat aset baru
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

        return res.status(201).json({
            message: 'Data aset auditorium berhasil ditambahkan.',
            data: newAsset
        });
    } catch (error) {
        console.error('Kesalahan menambahkan aset auditorium:', error);
        return res.status(500).json({ message: 'Kesalahan server internal.' });
    }
};

// Fungsi untuk mendapatkan semua aset auditorium
const getAllAuditoriumAssets = async (req, res) => {
    try {
        const type = req.query.type;
        const where = type ? { asset_type: type } : {};
        const auditoriumAssets = await RuangAsetAuditorium.findAll({
            order: [['createdAt', 'DESC']], 
            include: [
                {
                    model: CategoryAsset,
                    as: "asset_category"
                }
            ],
            where
        });

        if (auditoriumAssets.length === 0) {
            return res.status(204).json({ message: 'Tidak ada aset auditorium yang ditemukan.' });
        }

        return res.status(200).json({
            message: 'Berhasil mendapatkan semua aset auditorium.',
            data: auditoriumAssets
        });
    } catch (error) {
        console.error('Error mendapatkan aset auditorium:', error);
        return res.status(500).json({ message: 'Kesalahan server internal.' });
    }
};

// Fungsi untuk mendapatkan aset auditorium berdasarkan ID
const getAuditoriumAssetById = async (req, res) => {
    try {
        const { id } = req.params;
        const auditorium = await RuangAsetAuditorium.findByPk(id, {
            include: [
                {
                    model: CategoryAsset,
                    as: "asset_category"
                }
            ]
        });

        if (!auditorium) {
            return res.status(404).json({ message: 'Aset auditorium tidak ditemukan.' });
        }

        return res.status(200).json({
            message: `Berhasil mendapatkan aset auditorium dengan ID: ${id}.`,
            data: auditorium
        });
    } catch (error) {
        console.error(`Error mendapatkan aset auditorium dengan ID ${id}:`, error);
        return res.status(500).json({ message: 'Kesalahan server internal.' });
    }
};

// Fungsi untuk memperbarui aset auditorium
const updateAuditoriumAsset = async (req, res) => {
    try {
        const { id } = req.params;
        const { asset_name, category_id, asset_price, purchase_date, asset_condition, asset_type, last_maintenance_date } = req.body;

        const auditorium = await RuangAsetAuditorium.findByPk(id);
        if (!auditorium) {
            return res.status(404).json({ message: 'Aset auditorium tidak ditemukan.' });
        }

        if (!asset_name || !category_id || !asset_price || !purchase_date || !asset_condition || !asset_type) {
            return res.status(404).json({ message: 'Data tidak sesuai, mohon cek kembali.' });
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

        return res.status(200).json({
            message: `Aset auditorium dengan ID ${id} berhasil diperbarui.`,
            data: auditorium
        });
    } catch (error) {
        console.error(`Error memperbarui aset auditorium dengan ID ${id}:`, error);
        return res.status(500).json({ message: 'Kesalahan server internal.' });
    }
};

// Fungsi untuk menghapus aset auditorium
const deleteAuditoriumAsset = async (req, res) => {
    try {
        const { id } = req.params;
        const auditorium = await RuangAsetAuditorium.findByPk(id);

        if (!auditorium) {
            return res.status(404).json({ message: 'Aset auditorium tidak ditemukan.' });
        }

        await auditorium.destroy();
        return res.status(200).json({
            message: 'Data aset auditorium berhasil dihapus'
        });
    } catch (error) {
        console.error(`Error menghapus aset auditorium dengan ID ${id}:`, error);
        return res.status(500).json({ message: 'Kesalahan server internal.' });
    }
};

// Fungsi untuk menghasilkan QR Code untuk aset auditorium
const generateQRCode = async (req, res) => {
    try {
        const auditorium = await RuangAsetAuditorium.findByPk(req.params.id);
        if (!auditorium) {
            return res.status(404).json({ message: 'Aset auditorium tidak ditemukan.' });
        }

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

        const safeAssetName = auditorium.asset_name.replace(/[^a-zA-Z0-9]/g, '_');
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
        const auditoriumAssets = await RuangAsetAuditorium.findAll({
            include: [
                {
                    model: CategoryAsset,
                    as: "asset_category"
                }
            ]
        });

        const filteredAssets = auditoriumAssets.filter(asset => {
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
    createAuditoriumAsset,
    getAllAuditoriumAssets,
    getAuditoriumAssetById,
    updateAuditoriumAsset,
    deleteAuditoriumAsset,
    generateQRCode,
    searchAsset
};
