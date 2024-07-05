const { RuangAsetPerpustakaan, CategoryAsset } = require('../models');
const ExcelJS = require('exceljs');

// helper functions 
const addHeader = (worksheet) => {
    worksheet.mergeCells('A1:I1');
    worksheet.getCell('A1').value = 'Laporan Data Aset Ruang Perpustakaan';
    worksheet.getCell('A1').font = { bold: true, size: 16 };
    worksheet.getCell('A1').alignment = { horizontal: 'center' };

    worksheet.mergeCells('A2:I2');
    worksheet.getCell('A2').value = `Tanggal: ${new Date().toISOString().split('T')[0]}`;
    worksheet.getCell('A2').alignment = { horizontal: 'center' };

    const headerRow = worksheet.addRow([
        'ID Aset', 'Kode Aset', 'Nama Aset', 'Kategori Aset', 'Harga Aset', 'Tanggal Pembelian',
        'Kondisi Aset', 'Tipe Aset', 'Tanggal Terakhir Pemeliharaan'
    ]);

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
};

const addDataRows = (worksheet, data) => {
    const formattedData = data.map((asset) => ({
        'ID Aset': asset.asset_id,
        'Kode Aset': asset.asset_code,
        'Nama Aset': asset.asset_name,
        'Kategori Aset': asset.asset_category.category_name,
        'Harga Aset': asset.asset_price,
        'Tanggal Pembelian': asset.purchase_date.toISOString().split('T')[0],
        'Kondisi Aset': asset.asset_condition,
        'Tipe Aset': asset.asset_type,
        'Tanggal Terakhir Pemeliharaan': asset.last_maintenance_date ? asset.last_maintenance_date.toISOString().split('T')[0] : 'Belum Terdata'
    }));

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

    worksheet.autoFilter = 'A3:I3';

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
};

const setExportHeaders = (res, contentType, filename) => {
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
};

const getAllReportPerpustakaanAssets = async (req, res) => {
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
            return res.status(204).json({ message: 'Tidak Ada Aset Yang Ditemukan Di Perpustakaan' });
        }

        res.status(200).json({
            message: 'Mendapatkan Semua Laporan Perpustakaan Sukses',
            data: perpustakaanAssets
        });
    } catch (error) {
        console.error('Kesalahan pengambilan semua aset perpustakaan', error);
        res.status(500).json({ message: 'Kesalahan Server Internal, Tidak dapat mengambil aset perpustakaan' });
    }
};

const getReportPerpustakaanAssetById = async (req, res) => {
    try {
        const { id } = req.params;
        const perpustakaanAsset = await RuangAsetPerpustakaan.findByPk(id, {
            include: [
                {
                    model: CategoryAsset,
                    as: "asset_category"
                }
            ]
        });

        if (!perpustakaanAsset) {
            return res.status(404).json({ message: 'Aset Tidak Ditemukan!' });
        }

        res.status(200).json({
            message: `Mendapatkan Laporan Aset perpustakaan Sukses di ID: ${id}`,
            data: perpustakaanAsset
        });
    } catch (error) {
        console.error(`Kesalahan pengambilan aset perpustakaan dengan ID ${id}: `, error);
        res.status(500).json({ message: 'Kesalahan Server Internal, Tidak dapat mengambil aset perpustakaan' });
    }
};

const exportRuangAsetPerpustakaanToExcel = async (req, res) => {
    try {
        const data = await RuangAsetPerpustakaan.findAll({
            attributes: [
                'asset_id',
                'asset_code',
                'asset_name',
                'category_id',
                'asset_price',
                'purchase_date',
                'asset_condition',
                'asset_type',
                'last_maintenance_date',
            ],
            include: [
                {
                    model: CategoryAsset,
                    as: "asset_category"
                }
            ]
        });

        if (data.length === 0) {
            return res.status(204).json({ message: 'Tidak ada aset yang tersedia untuk diekspor.' });
        }

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Data Ruang Aset Perpustakaan');

        addHeader(worksheet);
        addDataRows(worksheet, data);

        const buffer = await workbook.xlsx.writeBuffer();
        const filename = `ruang_aset_perpustakaan_${Date.now()}.xlsx`;

        setExportHeaders(res, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', filename);
        res.send(buffer);

    } catch (error) {
        console.error('Kesalahan Mengexport Data:', error);
        res.status(500).json({ message: 'Kesalahan Server Internal, Tidak dapat export data ke Excel.' });
    }
};

const searchReportAsset = async (req, res) => {
    try {
        const { query } = req;
        const filterFields = ['asset_code', 'asset_name', 'category_id', 'asset_condition'];
        const perpustakaanAssets = await RuangAsetPerpustakaan.findAll({
            include: [
                {
                    model: CategoryAsset,
                    as: "asset_category"
                }
            ]
        });

        const filteredAssets = filterAset(perpustakaanAssets, filterFields, query);

        if (filteredAssets.length === 0) {
            return res.status(404).json({ message: 'Tidak ditemukan aset yang sesuai dengan kriteria pencarian' });
        }

        res.status(200).json(filteredAssets);
    } catch (error) {
        console.error('Kesalahan Pencarian Aset: ', error);
        res.status(500).json({ message: 'Kesalahan Server Internal, Tidak Dapat mencari aset.' });
    }
};

const filterAset = (assets, fields, query) => {
    return assets.filter(asset => {
        return fields.every(field => {
            if (!query[field]) return true;
            const searchTerm = query[field].toLowerCase();
            return asset[field].toString().toLowerCase().includes(searchTerm);
        });
    });
};

module.exports = {
    getAllReportPerpustakaanAssets,
    getReportPerpustakaanAssetById,
    exportRuangAsetPerpustakaanToExcel,
    searchReportAsset
};
