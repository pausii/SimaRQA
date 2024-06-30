const { RuangAsetMusholla, CategoryAsset } = require('../models');
const ExcelJS = require('exceljs');

const getReportMushollaAssets = async (req, res) => {
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
            message: 'Get Report Asset Musholla successfully',
            data: mushollaAssets
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getReportMushollaAssetById = async (req, res) => {
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
            message: `Get Report Asset Musholla Successfully at ID: ${id}`,
            data: musholla
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const exportRuangAsetMushollaToExcel = async (req, res) => {
    const setExportHeaders = (contentType, filename) => {
      res.setHeader('Content-Type', contentType);
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    };
  
    try {
      // Fetch data from the database
      const data = await RuangAsetMusholla.findAll({
        attributes: [
          'asset_id',
          'asset_code',
          'asset_name',
          'category_id', // Include category_id for potential future use in export
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
  
      // Prepare data for export
      const formattedData = data.map((asset) => ({
        'ID Aset': asset.asset_id,
        'Kode Aset': asset.asset_code,
        'Nama Aset': asset.asset_name,
        'Kategori Aset': asset.asset_category.category_name, // Include category_id for potential future use
        'Harga Aset': asset.asset_price,
        'Tanggal Pembelian': asset.purchase_date.toISOString().split('T')[0], // Use localized date format
        'Kondisi Aset': asset.asset_condition,
        'Tipe Aset': asset.asset_type,
        'Tanggal Terakhir Pemeliharaan': asset.last_maintenance_date ? asset.last_maintenance_date.toISOString().split('T')[0] : 'Belum Terdata' // Handle potential null value
      }));
  
      // Create a new workbook and worksheet
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Ruang Aset Musholla');

      // Add title and date
      worksheet.mergeCells('A1:I1');
      worksheet.getCell('A1').value = 'Laporan Data Aset Ruang Musholla';
      worksheet.getCell('A1').font = { bold: true, size: 16 };
      worksheet.getCell('A1').alignment = { horizontal: 'center' };

      worksheet.mergeCells('A2:I2');
      worksheet.getCell('A2').value = `Tanggal: ${new Date().toISOString().split('T')[0]}`;
      worksheet.getCell('A2').alignment = { horizontal: 'center' };

      // Add header row with styling
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

      // Add data rows with styling
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

      // Auto filter for the header
      worksheet.autoFilter = 'A3:I3';

      // Auto fit column width
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

      // Generate a unique filename with extension for clarity
      const filename = `ruang_aset_musholla_${Date.now()}.xlsx`;

      // Write workbook to buffer and send it as response
      const buffer = await workbook.xlsx.writeBuffer();
      setExportHeaders('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', filename);
      res.send(buffer);
  
    } catch (error) {
      console.error('Error exporting data:', error);
      res.status(500).send('Error exporting data. Please check logs for details.');
    } finally {
      // No cleanup needed since temporary file is not used
    }
};

const searchReportAsset = async (req, res) => {
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

      if (query.category_id) {
          const searchTerm = query.category_id.toLowerCase();
          filteredAssetMusholla.filteredAssetMusholla.filter(asset => asset.category_id.toLowerCase().includes(searchTerm));
      }

      if (query.asset_condition) {
          const searchTerm = query.asset_condition.toLowerCase();
          filteredAssetMusholla.filteredAssetMusholla.filter(asset => asset.asset_condition.toLowerCase().includes(searchTerm));
      }

      res.status(200).json(filteredAssetMusholla);
  } catch (error) {
      console.error('Error Pencarian: ', error);
      res.status(500).json({ message: 'Internal Server error'});
  }
};


module.exports = {
    getReportMushollaAssets,
    getReportMushollaAssetById,
    exportRuangAsetMushollaToExcel,
    searchReportAsset
}