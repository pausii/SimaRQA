const { RuangAsetPerpustakaan } = require('../models');
const XLSX = require('xlsx', 'xlsx-style');

const getReportPerpustakaanAssets = async (req, res) => {
    try {
        const perpustakaanAssets = await RuangAsetPerpustakaan.findAll();
        res.status(200).json({
            message: 'Get all Asset perpustakaan successfully',
            data: perpustakaanAssets
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getReportPerpustakaanAssetById = async (req, res) => {
    try {
        const perpustakaan = await RuangAsetPerpustakaan.findByPk(req.params.id);
        if (!perpustakaan) {
            return res.status(404).json({ message: 'Asset not found'});
        }
        res.status(200).json({
            message: `Get Asset perpustakaan Successfully at ID: ${id}`,
            data: perpustakaan
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const exportRuangAsetPerpustakaanToExcel = async (req, res) => {
    const setExportHeaders = (contentType, filename) => {
      res.setHeader('Content-Type', contentType);
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    };
  
    try {
      // Fetch data from the database
      const data = await RuangAsetPerpustakaan.findAll({
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
      });
  
      // Prepare data for export
      const formattedData = data.map((asset) => ({
        'Asset ID': asset.asset_id,
        'Asset Code': asset.asset_code,
        'Asset Name': asset.asset_name,
        'Category ID': asset.category_id, // Include category_id for potential future use
        'Asset Price': asset.asset_price,
        'Purchase Date': asset.purchase_date.toLocaleDateString(), // Use localized date format
        'Asset Condition': asset.asset_condition,
        'Asset Type': asset.asset_type,
        'Last Maintenance Date': asset.last_maintenance_date?.toLocaleDateString(), // Handle potential null value
      }));
  
      // Choose and execute the desired export method (Excel only in this case)
      const exportExcel = async () => {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(formattedData);

        // define style
        const headerStyle = {
          font: { bold: true, color: { rgb: 'FFFFFF'}},
          fill: { fgColor: { rgb: '4F81BD'}},
          border: {
            top: { style: 'thin', color: { rgb: '000000' }},
            bottom: { style: 'thin', color: { rgb: '000000' }},
            left: { style: 'thin', color: { rgb: '000000' }},
            right: { style: 'thin', color: { rgb: '000000' }},
          }
        };

        const cellStyle = {
          font: { color: { rgb: '000000' }},
          border: {
            top: { style: 'thin', color: { rgb: '000000' }},
            bottom: { style: 'thin', color: { rgb: '000000' }},
            left: { style: 'thin', color: { rgb: '000000' }},
            right: { style: 'thin', color: { rgb: '000000' }},
          }
        }

        // apply style to header
        const range = XLSX.utils.decode_range(worksheet['!ref']);
        for (let C = range.s.c; C <= range.e.c; ++C) {
          const address = XLSX.utils.encode_cell({ c: C, r: 0 });
          if (!worksheet[address]) continue;
          worksheet[address].s = headerStyle;
        }

        // Apply styles to cells
        for (let R = range.s.r + 1; R <= range.e.r; ++R) {
          for (let C = range.s.c; C <= range.e.c; ++C) {
            const address = XLSX.utils.encode_cell({ c: C, r: R });
            if (!worksheet[address]) continue;
            worksheet[address].s = cellStyle;
          }
        }


        XLSX.utils.book_append_sheet(workbook, worksheet, 'Ruang Aset Perpustakaan');
        const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
  
        // Generate a unique filename with extension for clarity
        const filename = `ruang_aset_perpustakaan_${Date.now()}.xlsx`;
  
        // Directly send the buffer as response (improvement)
        setExportHeaders('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', filename);
        res.send(buffer);
      };
  
      await exportExcel(); // Execute the export
  
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
        const perpustakaan = await RuangAsetPerpustakaan.findAll();

        let filteredAssetPerpustakaan = perpustakaan;

        if (query.asset_code) {
            const searchTerm = query.asset_code.toLowerCase();
            filteredAssetPerpustakaan.filteredAssetPerpustakaan.filter(asset => asset.asset_code.toLowerCase().includes(searchTerm));
        }

        if (query.asset_name) {
            const searchTerm = query.asset_name.toLowerCase();
            filteredAssetPerpustakaan.filteredAssetPerpustakaan.filter(asset => asset.asset_name.toLowerCase().includes(searchTerm));
        }

        if (query.category_id) {
            const searchTerm = query.category_id.toLowerCase();
            filteredAssetPerpustakaan.filteredAssetPerpustakaan.filter(asset => asset.category_id.toLowerCase().includes(searchTerm));
        }

        if (query.asset_condition) {
            const searchTerm = query.asset_condition.toLowerCase();
            filteredAssetPerpustakaan.filteredAssetPerpustakaan.filter(asset => asset.asset_condition.toLowerCase().includes(searchTerm));
        }

        res.status(200).json(filteredAssetPerpustakaan);
    } catch (error) {
        console.error('Error Pencarian: ', error);
        res.status(500).json({ message: 'Internal Server error'});
    }
};

module.exports = {
    getReportPerpustakaanAssets,
    getReportPerpustakaanAssetById,
    exportRuangAsetPerpustakaanToExcel,
    searchReportAsset
}