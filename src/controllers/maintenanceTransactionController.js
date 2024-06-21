const { 
    PemeliharaanAsset, 
    RuangAsetMusholla, 
    RuangAsetAuditorium, 
    RuangAsetPerpustakaan, 
    RuangAsetUtilitas 
} = require('../models');
const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx')

// Fungsi bantu untuk mengirimkan pesan kesalahan
const sendErrorResponse = (res, statusCode, message, error = null) => {
    res.status(statusCode).json({ message, error: error?.message });
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
            throw new Error("Invalid asset code prefix");
    }
};

// Endpoint untuk mendapatkan semua transaksi pemeliharaan
const getAllMaintenanceTransaction = async (req, res) => {
    try {
        const transactions = await PemeliharaanAsset.findAll();
        res.status(200).json({
            message: 'Get All Maintenance Transactions successfully',
            data: transactions
        });
    } catch (error) {
        sendErrorResponse(res, 500, "Failed to get maintenance transactions", error);
    }
};

// Endpoint untuk mendapatkan transaksi pemeliharaan berdasarkan ID
const getMaintenanceTransactionById = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await PemeliharaanAsset.findByPk(id);
        if (!transaction) {
            return res.status(404).json({ message: 'Maintenance transaction not found' });
        }
        res.status(200).json({
            message: `Get Maintenance Transaction successfully for ID: ${id}`,
            data: transaction
        });
    } catch (error) {
        sendErrorResponse(res, 500, "Failed to get maintenance transaction", error);
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
            return res.status(404).json({ message: "Asset not found" });
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
            message: "Create Maintenance successfully",
            data: transaction
        });
    } catch (error) {
        sendErrorResponse(res, 500, "Failed to create maintenance", error);
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
            return res.status(404).json({ message: "Maintenance transaction not found" });
        }

        const assetModel = getAssetModelByCode(maintenance_asset_code);
        const asset = await assetModel.findOne({ where: { asset_code: maintenance_asset_code } });

        if (!asset) {
            return res.status(404).json({ message: "Asset not found" });
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
            message: "Update Maintenance successfully",
            data: transaction
        });
    } catch (error) {
        sendErrorResponse(res, 500, "Failed to update maintenance", error);
    }
};


const exportMaintenanceTransactionToExcel = async (req, res) => {
    const setExportHeaders = (contentType, filename) => {
        res.setHeader('Content-Type', contentType);
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    };

    try {
    // Fetch data from the database
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

    // Prepare data for export
    const formattedData = data.map((asset) => ({
      'Maintenance ID': asset.maintenance_id,
      'Asset Code': asset.maintenance_asset_code,
      'Asset Name': asset.maintenance_asset_name,
      'Maintenance Date': asset.maintenance_date.toLocaleDateString(), // Use localized date format
      'Asset Condition': asset.maintenance_asset_condition,
      'Price (Maintenance)': asset.price_maintenance,
      'Maintenance Details': asset.details_maintenance,
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


      XLSX.utils.book_append_sheet(workbook, worksheet, 'Pemeliharaan Asset');
      const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });

      // Generate a unique filename with extension for clarity
      const filename = `pemeliharaan_asset_${Date.now()}.xlsx`;

      // **Improvement:** Directly send the buffer as response instead of writing to a temp file
      setExportHeaders('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', filename);
      res.send(buffer);
    };

    await exportExcel(); // Execute the export

  } catch (error) {
    console.error('Error exporting data:', error);
    res.status(500).send('Error exporting data. Please check logs for details.');
  } finally {
    // **Improvement:** No need for cleanup since temporary file is not used
  }
};

const searchMaintenanceTransaction = async (req, res) => {
    const { query } = req;

    try {
        // Fetch all data from PemeliharaanAsset table
        const maintenanceAssets = await PemeliharaanAsset.findAll();

        let filteredMaintenanceAssets = maintenanceAssets;

        // Filter based on maintenance_asset_code
        if (query.maintenance_asset_code) {
            const searchTerm = query.maintenance_asset_code.toLowerCase();
            filteredMaintenanceAssets = filteredMaintenanceAssets.filter(asset => 
                asset.maintenance_asset_code.toLowerCase().includes(searchTerm)
            );
        }

        // Filter based on maintenance_asset_name
        if (query.maintenance_asset_name) {
            const searchTerm = query.maintenance_asset_name.toLowerCase();
            filteredMaintenanceAssets = filteredMaintenanceAssets.filter(asset => 
                asset.maintenance_asset_name.toLowerCase().includes(searchTerm)
            );
        }

        // Filter based on maintenance_date
        if (query.maintenance_date) {
            const searchTerm = new Date(query.maintenance_date).toISOString().slice(0, 10);
            filteredMaintenanceAssets = filteredMaintenanceAssets.filter(asset => 
                new Date(asset.maintenance_date).toISOString().slice(0, 10) === searchTerm
            );
        }

        // Filter based on maintenance_asset_condition
        if (query.maintenance_asset_condition) {
            const searchTerm = query.maintenance_asset_condition.toLowerCase();
            filteredMaintenanceAssets = filteredMaintenanceAssets.filter(asset => 
                asset.maintenance_asset_condition.toLowerCase() === searchTerm
            );
        }

        // Filter based on price_maintenance (assuming it can be filtered based on a range or exact value)
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

        // Filter based on details_maintenance (if required)
        if (query.details_maintenance) {
            const searchTerm = query.details_maintenance.toLowerCase();
            filteredMaintenanceAssets = filteredMaintenanceAssets.filter(asset => 
                asset.details_maintenance && asset.details_maintenance.toLowerCase().includes(searchTerm)
            );
        }

        res.status(200).json(filteredMaintenanceAssets);
    } catch (error) {
        console.error('Error Searching: ', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};




// Export semua fungsi untuk digunakan di rute
module.exports = { 
    getAllMaintenanceTransaction,
    getMaintenanceTransactionById,
    createMaintenanceTransaction,
    updateMaintenanceTransaction,
    exportMaintenanceTransactionToExcel,
    searchMaintenanceTransaction,
    // printAllMaintenanceReports
};