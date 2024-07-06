const { RuangAsetUtilitas, CategoryAsset } = require('../models');
const QRCode = require('qrcode');
const generateAssetCode = require('../services/generateAssetCode');
const handlebars = require('handlebars');

// Fungsi untuk membuat aset utilitas
const createUtilitasAsset = async (req, res) => {
    try {
        const { asset_name, category_id, asset_price, purchase_date, asset_condition, asset_type, last_maintenance_date } = req.body;

        // Validasi input
        if (!asset_name || !category_id || !asset_price || !purchase_date || !asset_condition || !asset_type) {
            return res.status(400).json({ message: 'Data tidak sesuai, mohon cek kembali.' });
        }

        // Generate kode aset unik
        const assetCode = await generateAssetCode(RuangAsetUtilitas, 'UTI');

        // Buat aset baru
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

        return res.status(201).json({
            message: 'Data aset utilitas berhasil ditambahkan.',
            data: newAsset
        });
    } catch (error) {
        console.error('Kesalahan menambahkan aset utilitas:', error);
        return res.status(500).json({ message: 'Kesalahan server internal.' });
    }
};

// Fungsi untuk mendapatkan semua aset utilitas
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

        if (utilitasAssets.length === 0) {
            return res.status(204).json({ message: 'Tidak ada aset utilitas yang ditemukan.' });
        }

        return res.status(200).json({
            message: 'Berhasil mendapatkan semua aset utilitas.',
            data: utilitasAssets
        });
    } catch (error) {
        console.error('Error mendapatkan aset utilitas:', error);
        return res.status(500).json({ message: 'Kesalahan server internal.' });
    }
};

// Fungsi untuk mendapatkan aset utilitas berdasarkan ID
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
            return res.status(404).json({ message: 'Aset utilitas tidak ditemukan.' });
        }

        return res.status(200).json({
            message: `Berhasil mendapatkan aset utilitas dengan ID: ${id}.`,
            data: utilitas
        });
    } catch (error) {
        console.error(`Error mendapatkan aset utilitas dengan ID ${id}:`, error);
        return res.status(500).json({ message: 'Kesalahan server internal.' });
    }
};

// Fungsi untuk memperbarui aset utilitas
const updateUtilitasAsset = async (req, res) => {
    try {
        const { id } = req.params;
        const { asset_name, category_id, asset_price, purchase_date, asset_condition, asset_type, last_maintenance_date } = req.body;

        const utilitas = await RuangAsetUtilitas.findByPk(id);
        if (!utilitas) {
            return res.status(404).json({ message: 'Aset utilitas tidak ditemukan.' });
        }

        if (!asset_name || !category_id || !asset_price || !purchase_date || !asset_condition || !asset_type) {
            return res.status(404).json({ message: 'Data tidak sesuai, mohon cek kembali.' });
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

        return res.status(200).json({
            message: `Data aset utilitas dengan ID ${id} berhasil diperbarui.`,
            data: utilitas
        });
    } catch (error) {
        console.error(`Error memperbarui aset utilitas dengan ID ${id}:`, error);
        return res.status(500).json({ message: 'Kesalahan server internal.' });
    }
};

// Fungsi untuk menghapus aset utilitas
const deleteUtilitasAsset = async (req, res) => {
    try {
        const { id } = req.params;
        const utilitas = await RuangAsetUtilitas.findByPk(id);

        if (!utilitas) {
            return res.status(404).json({ message: 'Aset utilitas tidak ditemukan.' });
        }

        await utilitas.destroy();
        return res.status(204).send();
    } catch (error) {
        console.error(`Error menghapus aset utilitas dengan ID ${id}:`, error);
        return res.status(500).json({ message: 'Kesalahan server internal.' });
    }
};

// Fungsi untuk menghasilkan QR Code untuk aset utilitas
const generateQRCode = async (req, res) => {
    try {
        const utilitas = await RuangAsetUtilitas.findByPk(req.params.id);
        if (!utilitas) {
            return res.status(404).json({ message: 'Aset utilitas tidak ditemukan.' });
        }

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

        const safeAssetName = utilitas.asset_name.replace(/[^a-zA-Z0-9]/g, '_');
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
        const utilitasAssets = await RuangAsetUtilitas.findAll({
            include: [
                {
                    model: CategoryAsset,
                    as: "asset_category"
                }
            ]
        });

        const filteredAssets = utilitasAssets.filter(asset => {
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
    createUtilitasAsset,
    getAllUtilitasAssets,
    getUtilitasAssetById,
    updateUtilitasAsset,
    deleteUtilitasAsset,
    generateQRCode,
    searchAsset
};
