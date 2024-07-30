const { PermohonanKerusakanAsset, RuangAsetMusholla, RuangAsetAuditorium, RuangAsetPerpustakaan, RuangAsetUtilitas } = require('../models');
const ExcelJS = require('exceljs');

const sendErrorResponse = (res, statusCode, message, error = null) => {
    res.status(statusCode).json({ message, error: error?.message });
};

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
            throw new Error("Invalid asset code prefix");
    }
};

const getAllRequestRepair = async (req, res) => {
    try {
        const requestRepair = await PermohonanKerusakanAsset.findAll({
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json({
            message: 'Berhasil Mendapatkan Semua Laporan Permohonan Perbaikan Kerusakan Aset',
            data: requestRepair
        });
    } catch (error) {
        sendErrorResponse(res, 500, "Gagal mendapatkan laporan permohonan perbaikan kerusakan aset", error);
    }
};

const getRequestRepairById = async (req, res) => {
    try {
        const { id } = req.params;
        const requestRepair = await PermohonanKerusakanAsset.findByPk(id);
        if (!requestRepair) {
            return res.status(404).json({ message: 'Permohonan perbaikan kerusakan aset tidak ditemukan' });
        }
        res.status(200).json({
            message: `Berhasil Mendapatkan Transaksi permohonan Perbaikan Kerusakan Aset di ID: ${id}`,
            data: requestRepair
        });
    } catch (error) {
        sendErrorResponse(res, 500, "Gagal mendapatkan transaksi permohonan perbaikan kerusakan aset", error);
    }
};

const tambahPermohonanPerbaikanAsset = async (req, res) => {
    try {
        const { request_asset_code, damage_date, notes } = req.body;
        const assetModel = getAssetModelByCode(request_asset_code);
        const asset = await assetModel.findOne({ where: { asset_code: request_asset_code } });

        if (!asset) {
            return res.status(404).json({ message: "Asset tidak ditemukan." });
        }

        const isRequest = await PermohonanKerusakanAsset.findOne({
            where: { request_asset_code, status_confirmation: 'Sedang Dikonfirmasi' }
        });

        if (isRequest) {
            return res.status(400).json({ message: "Aset Sedang Dalam Permohonan" });
        }

        const request_asset_name = asset.asset_name;
        const requestRepair = await PermohonanKerusakanAsset.create({
            request_asset_code,
            request_asset_name,
            damage_date,
            notes
        });

        res.status(201).json({
            message: "Permohonan Perbaikan Aset Berhasil Ditambahkan.",
            data: requestRepair
        });
    } catch (error) {
        sendErrorResponse(res, 500, "Gagal menambahkan permohonan perbaikan aset", error);
    }
};

const konfirmasiPerbaikanAsset = async (req, res) => {
    try {
        const { id } = req.params;

        const requestRepair = await PermohonanKerusakanAsset.findByPk(id);
        if (!requestRepair) {
            return res.status(404).json({ message: "Permohonan perbaikan kerusakan aset tidak ditemukan" });
        }

        requestRepair.status_confirmation = 'Sudah Dikonfirmasi';
        await requestRepair.save();

        res.status(200).json({
            message: "Permohonan perbaikan aset berhasil dikonfirmasi.",
            data: requestRepair
        });
    } catch (error) {
        sendErrorResponse(res, 500, "Gagal mengkonfirmasi perbaikan aset", error);
    }
};

const exportRequestRepairToExcel = async (req, res) => {
    const setExportHeaders = (contentType, filename) => {
        res.setHeader('Content-Type', contentType);
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    };

    try {
        const data = await PermohonanKerusakanAsset.findAll();

        const formattedData = data.map((asset) => ({
            'ID Permohonan': asset.request_id,
            'Kode Aset': asset.request_asset_code,
            'Nama Aset': asset.request_asset_name,
            'Tanggal Kerusakan': asset.damage_date.toISOString().split('T')[0],
            'Status Konfirmasi': asset.status_confirmation,
            'Catatan': asset.notes || ''
        }));

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Permohonan Kerusakan Aset');

        worksheet.mergeCells('A1:F1');
        worksheet.getCell('A1').value = 'Laporan Permohonan Kerusakan Aset';
        worksheet.getCell('A1').font = { bold: true, size: 16 };
        worksheet.getCell('A1').alignment = { horizontal: 'center' };

        worksheet.mergeCells('A2:F2');
        worksheet.getCell('A2').value = `Tanggal: ${new Date().toISOString().split('T')[0]}`;
        worksheet.getCell('A2').alignment = { horizontal: 'center' };

        const headerRow = worksheet.addRow(Object.keys(formattedData[0]));
        headerRow.eachCell((cell, colNumber) => {
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
            row.eachCell((cell, colNumber) => {
                cell.font = { color: { argb: '000000' } };
                cell.border = {
                    top: { style: 'thin', color: { argb: '000000' } },
                    bottom: { style: 'thin', color: { argb: '000000' } },
                    left: { style: 'thin', color: { argb: '000000' } },
                    right: { style: 'thin', color: { argb: '000000' } },
                };
            });
        });

        worksheet.autoFilter = 'A3:F3';

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

        const filename = `permohonan_kerusakan_asset_${Date.now()}.xlsx`;
        const buffer = await workbook.xlsx.writeBuffer();
        setExportHeaders('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', filename);
        res.send(buffer);

    } catch (error) {
        console.error('Kesalahan mengexport data:', error);
        res.status(500).send('Kesalahan mengexport data.');
    }
};

const searchPermohonanKerusakanAsset = async (req, res) => {
    const { query } = req;

    try {
        const permohonanKerusakanAssets = await PermohonanKerusakanAsset.findAll();

        const filteredAssets = permohonanKerusakanAssets.filter(asset => {
            return Object.keys(query).every(key => {
                const searchValue = query[key].toLowerCase();
                const assetValue = asset[key]?.toString().toLowerCase();
                return assetValue && assetValue.includes(searchValue);
            });
        });

        if (filteredAssets.length === 0) {
            return res.status(404).json({ message: "Tidak kesamaan transaksi ditemukan." });
        }

        res.status(200).json(filteredAssets);
    } catch (error) {
        console.error('Kesalahan Pencarian Transaksi Peminjaman: ', error);
        res.status(500).json({ message: 'Kesalahan Server Internal.' });
    }
};

module.exports = {
    getAllRequestRepair,
    getRequestRepairById,
    tambahPermohonanPerbaikanAsset,
    konfirmasiPerbaikanAsset,
    exportRequestRepairToExcel,
    searchPermohonanKerusakanAsset
};
