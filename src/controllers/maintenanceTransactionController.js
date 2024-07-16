const { 
    PemeliharaanAsset, 
    RuangAsetMusholla, 
    RuangAsetAuditorium, 
    RuangAsetPerpustakaan, 
    RuangAsetUtilitas 
} = require('../models');
const ExcelJS = require('exceljs');

// Fungsi bantu untuk mengirimkan message kesalahan
const sendErrorResponse = (res, statusCode, message, error = null) => {
    console.error(error);
    res.status(statusCode).json({ message: message, kesalahan: error?.message });
};

// Fungsi bantu untuk mendapatkan model aset berdasarkan kode
const getAssetModelByCode = (assetCode) => {
    const prefix = assetCode.slice(0, 3);
    switch (prefix) {
        case 'AUD':
            return RuangAsetAuditorium;
        case 'MUS':
            return RuangAsetMusholla;
        case 'LIB':
            return RuangAsetPerpustakaan;
        case 'UTI':
            return RuangAsetUtilitas;
        default:
            throw new Error("Kode aset tidak valid");
    }
};

// Endpoint untuk mendapatkan semua transaksi pemeliharaan
const getAllMaintenanceTransaction = async (req, res) => {
    try {
        const transactions = await PemeliharaanAsset.findAll({
            order: [['createdAt', 'DESC']] 
        });
        res.status(200).json({
            message: 'Berhasil mendapatkan semua transaksi pemeliharaan',
            data: transactions
        });
    } catch (error) {
        sendErrorResponse(res, 500, "Gagal mendapatkan transaksi pemeliharaan", error);
    }
};


// Endpoint untuk mendapatkan transaksi pemeliharaan berdasarkan ID
const getMaintenanceTransactionById = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await PemeliharaanAsset.findByPk(id);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaksi pemeliharaan tidak ditemukan' });
        }
        res.status(200).json({
            message: `Berhasil mendapatkan transaksi pemeliharaan dengan ID: ${id}`,
            data: transaction
        });
    } catch (error) {
        sendErrorResponse(res, 500, "Gagal mendapatkan transaksi pemeliharaan", error);
    }
};

// Endpoint untuk membuat transaksi pemeliharaan baru
const createMaintenanceTransaction = async (req, res) => {
    try {
        const { 
            maintenance_asset_code, 
            maintenance_date, 
            maintenance_asset_condition, 
            price_maintenance, 
            details_maintenance 
        } = req.body;

        const assetModel = getAssetModelByCode(maintenance_asset_code);
        const asset = await assetModel.findOne({ where: { asset_code: maintenance_asset_code } });

        if (!asset) {
            return res.status(404).json({ message: "Aset tidak ditemukan" });
        }

        if (!maintenance_asset_code || !maintenance_date || !maintenance_asset_condition || !price_maintenance || !details_maintenance) {
            return res.status(404).json({ message: "Data tidak sesuai, mohon cek kembali."});
        }

        const maintenance_asset_name = asset.asset_name;
        const transaction = await PemeliharaanAsset.create({
            maintenance_asset_code,
            maintenance_asset_name,
            maintenance_date,
            maintenance_asset_condition,
            price_maintenance,
            details_maintenance
        });

        await asset.update({
            last_maintenance_date: maintenance_date,
            asset_condition: maintenance_asset_condition
        });

        res.status(201).json({
            message: "Berhasil menambahkan transaksi pemeliharaan",
            data: transaction
        });
    } catch (error) {
        sendErrorResponse(res, 500, "Gagal membuat transaksi pemeliharaan", error);
    }
};

// Endpoint untuk mengupdate transaksi pemeliharaan berdasarkan ID
const updateMaintenanceTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const { 
            maintenance_asset_code, 
            maintenance_date, 
            maintenance_asset_condition, 
            price_maintenance, 
            details_maintenance 
        } = req.body;

        const transaction = await PemeliharaanAsset.findByPk(id);

        if (!transaction) {
            return res.status(404).json({ message: "Transaksi pemeliharaan tidak ditemukan" });
        }

        if (!maintenance_asset_code || !maintenance_date || !maintenance_asset_condition || !price_maintenance || !details_maintenance) {
            return res.status(404).json({ message: "Data pemeliharaan tidak sesuai, mohon cek kembali" });
        }

        const assetModel = getAssetModelByCode(maintenance_asset_code);
        const asset = await assetModel.findOne({ where: { asset_code: maintenance_asset_code } });

        if (!asset) {
            return res.status(404).json({ message: "Aset tidak ditemukan" });
        }

        const maintenance_asset_name = asset.asset_name;
        await transaction.update({
            maintenance_asset_code,
            maintenance_asset_name,
            maintenance_date,
            maintenance_asset_condition,
            price_maintenance,
            details_maintenance
        });

        await asset.update({
            last_maintenance_date: maintenance_date,
            asset_condition: maintenance_asset_condition
        });

        res.status(200).json({
            message: "Berhasil memperbarui transaksi pemeliharaan",
            data: transaction
        });
    } catch (error) {
        sendErrorResponse(res, 500, "Gagal memperbarui transaksi pemeliharaan", error);
    }
};

// Endpoint untuk mengekspor transaksi pemeliharaan ke dalam format Excel
const exportMaintenanceTransactionToExcel = async (req, res) => {
    const setExportHeaders = (contentType, filename) => {
        res.setHeader('Content-Type', contentType);
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    };

    try {
        const data = await PemeliharaanAsset.findAll({
            attributes: [
                'maintenance_id',
                'maintenance_asset_code',
                'maintenance_asset_name',
                'maintenance_date',
                'maintenance_asset_condition',
                'price_maintenance',
                'details_maintenance',
            ],
        });

        const formattedData = data.map((asset) => ({
            'ID Pemeliharaan': asset.maintenance_id,
            'Kode Aset': asset.maintenance_asset_code,
            'Nama Aset': asset.maintenance_asset_name,
            'Tanggal Pemeliharaan': asset.maintenance_date.toLocaleDateString(), 
            'Kondisi Aset': asset.maintenance_asset_condition,
            'Harga Pemeliharaan': asset.price_maintenance,
            'Detail Pemeliharaan': asset.details_maintenance,
        }));

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Pemeliharaan Aset');

        worksheet.mergeCells('A1:G1');
        worksheet.getCell('A1').value = 'Laporan Data Transaksi Pemeliharaan Aset';
        worksheet.getCell('A1').font = { bold: true, size: 16 };
        worksheet.getCell('A1').alignment = { horizontal: 'center' };

        worksheet.mergeCells('A2:G2');
        worksheet.getCell('A2').value = `Tanggal: ${new Date().toISOString().split('T')[0]}`;
        worksheet.getCell('A2').alignment = { horizontal: 'center' };

        const headerRow = worksheet.addRow(Object.keys(formattedData[0]));
        headerRow.eachCell((cell) => {
            cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: '4F81BD' }
            };
            cell.border = {
                top: { style: 'thin', color: { argb: '000000' } },
                bottom: { style: 'thin', color: { argb: '000000' } },
                left: { style: 'thin', color: { argb: '000000' } },
                right: { style: 'thin', color: { argb: '000000' } },
            };
        });

        formattedData.forEach(asset => {
            const row = worksheet.addRow(Object.values(asset));
            row.eachCell((cell) => {
                cell.font = { color: { argb: '000000' } };
                cell.border = {
                    top: { style: 'thin', color: { argb: '000000' } },
                    bottom: { style: 'thin', color: { argb: '000000' } },
                    left: { style: 'thin', color: { argb: '000000' } },
                    right: { style: 'thin', color: { argb: '000000' } },
                };
            });
        });

        worksheet.autoFilter = 'A3:G3';

        worksheet.columns.forEach(column => {
            let maxLength = 0;
            column.eachCell({ includeEmpty: true }, cell => {
                const cellLength = cell.value ? cell.value.toString().length : 10;
                if (cellLength > maxLength) {
                    maxLength = cellLength;
                }
            });
            column.width = maxLength < 10 ? 10 : maxLength;
        });

        const filename = `transaksi_pemeliharaan_asset_${Date.now()}.xlsx`;
        const buffer = await workbook.xlsx.writeBuffer();
        setExportHeaders('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', filename);
        res.send(buffer);

    } catch (error) {
        sendErrorResponse(res, 500, 'Gagal mengekspor data', error);
    }
};

// Endpoint untuk mencari transaksi pemeliharaan berdasarkan kriteria
const searchMaintenanceTransaction = async (req, res) => {
    const { query } = req;

    try {
        let filteredMaintenanceAssets = await PemeliharaanAsset.findAll();

        if (query.maintenance_asset_code) {
            const searchTerm = query.maintenance_asset_code.toLowerCase();
            filteredMaintenanceAssets = filteredMaintenanceAssets.filter(asset => 
                asset.maintenance_asset_code.toLowerCase().includes(searchTerm)
            );
        }

        if (query.maintenance_asset_name) {
            const searchTerm = query.maintenance_asset_name.toLowerCase();
            filteredMaintenanceAssets = filteredMaintenanceAssets.filter(asset => 
                asset.maintenance_asset_name.toLowerCase().includes(searchTerm)
            );
        }

        if (query.maintenance_date) {
            const searchTerm = new Date(query.maintenance_date).toISOString().slice(0, 10);
            filteredMaintenanceAssets = filteredMaintenanceAssets.filter(asset => 
                new Date(asset.maintenance_date).toISOString().slice(0, 10) === searchTerm
            );
        }

        if (query.maintenance_asset_condition) {
            const searchTerm = query.maintenance_asset_condition.toLowerCase();
            filteredMaintenanceAssets = filteredMaintenanceAssets.filter(asset => 
                asset.maintenance_asset_condition.toLowerCase() === searchTerm
            );
        }

        if (query.price_maintenance_min && query.price_maintenance_max) {
            const minPrice = parseFloat(query.price_maintenance_min);
            const maxPrice = parseFloat(query.price_maintenance_max);
            filteredMaintenanceAssets = filteredMaintenanceAssets.filter(asset => 
                asset.price_maintenance >= minPrice && asset.price_maintenance <= maxPrice
            );
        } else if (query.price_maintenance) {
            const searchPrice = parseFloat(query.price_maintenance);
            filteredMaintenanceAssets = filteredMaintenanceAssets.filter(asset => 
                asset.price_maintenance === searchPrice
            );
        }

        if (query.details_maintenance) {
            const searchTerm = query.details_maintenance.toLowerCase();
            filteredMaintenanceAssets = filteredMaintenanceAssets.filter(asset => 
                asset.details_maintenance && asset.details_maintenance.toLowerCase().includes(searchTerm)
            );
        }

        res.status(200).json({
            message: 'Berhasil mencari transaksi pemeliharaan',
            data: filteredMaintenanceAssets
        });
    } catch (error) {
        sendErrorResponse(res, 500, 'Gagal mencari transaksi pemeliharaan', error);
    }
};

module.exports = { 
    getAllMaintenanceTransaction,
    getMaintenanceTransactionById,
    createMaintenanceTransaction,
    updateMaintenanceTransaction,
    exportMaintenanceTransactionToExcel,
    searchMaintenanceTransaction,
};
