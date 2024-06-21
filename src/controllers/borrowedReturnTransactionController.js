const { PeminjamanPengembalianAsset, RuangAsetMusholla, RuangAsetAuditorium, RuangAsetPerpustakaan, RuangAsetUtilitas } = require('../models');

const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const sendErrorResponse = (res, statusCode, message, error = null) => {
  res.status(statusCode).json({ message, error: error?.message });
}

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
}

const getAllBorrowedReturnTransaction = async (req, res) => {
  try {
    const borrowedReturn = await PeminjamanPengembalianAsset.findAll();
    res.status(200).json({
      message: 'Get All Borrowed & Return Transaction successfully',
      data: borrowedReturn      
    })
  } catch (error) {
    sendErrorResponse(res, 500, "Failed to get borrowed & return transactions", error);
  }
};

const getBorrowedReturnTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    const borrowedReturn = await PeminjamanPengembalianAsset.findAll(id);
    if (!borrowedReturn) {
      return res.status(404).json({ message: 'Borrowed & Return transaction not found' });
    }
    res.status(200).json({
      message: `Get Borrowed & Return Transaction successfully for ID: ${id}`,
      data: borrowedReturn
    });
  } catch (error) {
    sendErrorResponse(res, 500, "Failed to get borrowed & return transaction")
  }
}

const createBorrowedReturnTransaction = async (req, res) => {
  try {
      const { 
          borrowed_asset_code, 
          borrowed_name,
          used_by_program,
          borrowed_date,
          due_date,
          status,
          notes 
      } = req.body;

      const assetModel = getAssetModelByCode(borrowed_asset_code);
      const asset = await assetModel.findOne({ where: { asset_code: borrowed_asset_code } });

      if (!asset) {
          return res.status(404).json({ message: "Asset not found" });
      }

      const borrowed_asset_name = asset.asset_name;
      const transaction = await PeminjamanPengembalianAsset.create({
          borrowed_asset_code, 
          borrowed_asset_name,
          borrowed_name, 
          used_by_program, 
          borrowed_date,
          due_date,
          status,
          notes
      });

      res.status(201).json({
          message: "Create Peminjaman Asset Successfully",
          data: transaction
      });
  } catch (error) {
      sendErrorResponse(res, 500, "Failed to create maintenance", error);
  }
};


const updateBorrowedReturnTransaction = async (req, res) => {
  try {
      const { id } = req.params;
      const { 
          borrowed_name, 
          used_by_program, 
          borrowed_date,
          due_date,
          status,
          notes 
      } = req.body;

      const transaction = await PeminjamanPengembalianAsset.findByPk(id);

      if (!transaction) {
          return res.status(404).json({ message: "Borrowed Return Transaction not found" });
      }

      if (!asset) {
          return res.status(404).json({ message: "Asset not found" });
      }
      await transaction.update({
          borrowed_name, 
          used_by_program, 
          borrowed_date,
          due_date,
          status,
          notes 
      });

      res.status(200).json({
          message: "Update Borrowed Return successfully",
          data: transaction
      });
  } catch (error) {
      sendErrorResponse(res, 500, "Failed to update borrowed return", error);
  }
};

const exportBorrowedReturnTransactionToExcel = async (req, res) => {
  const setExportHeaders = (contentType, filename) => {
      res.setHeader('Content-Type', contentType);
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  };

  try {
  // Fetch data from the database
  const data = await PeminjamanPengembalianAsset.findAll({
    attributes: [
      'borrowed_id',
      'borrowed_asset_code',
      'borrowed_asset_name',
      'borrowed_name',
      'used_by_program',
      'borrowed_date',
      'due_date',
      'return_date',
      'status_date',
      'notes'
    ],
  });

  // Prepare data for export
  const formattedData = data.map((asset) => ({
    'Borrowed ID': asset.borrowed_id,
    'Asset Code': asset.borrowed_asset_code,
    'Asset Name': asset.borrowed_asset_name,
    'Borrowed Name': asset.borrowed_name,
    'Used By Program': asset.used_by_program,
    'Borrowed Date': asset.borrowed_date.toLocaleDateString(), // Use localized date format
    'Due Date': asset.due_date.toLocaleDateString(),
    'Return Date': asset.return_date.toLocaleDateString(),
    'Status': asset.status,
    'Notes': asset.notes
  }));

  // Choose and execute the desired export method (Excel only in this case)
  const exportExcel = async () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Peminjaman dan Pengembalian Asset');
    const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });

    // Generate a unique filename with extension for clarity
    const filename = `peminjaman_pengembalian_asset_${Date.now()}.xlsx`;

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

const searchPeminjamanPengembalianAsset = async (req, res) => {
    const { query } = req;

    try {
        // Ambil semua data dari tabel PeminjamanPengembalianAsset
        const peminjamanPengembalianAssets = await PeminjamanPengembalianAsset.findAll();

        let filteredAssets = peminjamanPengembalianAssets;

        // Filter berdasarkan borrowed_asset_code
        if (query.borrowed_asset_code) {
            const searchTerm = query.borrowed_asset_code.toLowerCase();
            filteredAssets = filteredAssets.filter(asset => 
                asset.borrowed_asset_code.toLowerCase().includes(searchTerm)
            );
        }

        // Filter berdasarkan borrowed_asset_name
        if (query.borrowed_asset_name) {
            const searchTerm = query.borrowed_asset_name.toLowerCase();
            filteredAssets = filteredAssets.filter(asset => 
                asset.borrowed_asset_name.toLowerCase().includes(searchTerm)
            );
        }

        // Filter berdasarkan borrowed_name
        if (query.borrowed_name) {
            const searchTerm = query.borrowed_name.toLowerCase();
            filteredAssets = filteredAssets.filter(asset => 
                asset.borrowed_name.toLowerCase().includes(searchTerm)
            );
        }

        // Filter berdasarkan used_by_program
        if (query.used_by_program) {
            const searchTerm = query.used_by_program.toLowerCase();
            filteredAssets = filteredAssets.filter(asset => 
                asset.used_by_program.toLowerCase() === searchTerm
            );
        }

        // Filter berdasarkan borrowed_date
        if (query.borrowed_date) {
            const searchTerm = new Date(query.borrowed_date).toISOString().slice(0, 10);
            filteredAssets = filteredAssets.filter(asset => 
                new Date(asset.borrowed_date).toISOString().slice(0, 10) === searchTerm
            );
        }

        // Filter berdasarkan due_date
        if (query.due_date) {
            const searchTerm = new Date(query.due_date).toISOString().slice(0, 10);
            filteredAssets = filteredAssets.filter(asset => 
                new Date(asset.due_date).toISOString().slice(0, 10) === searchTerm
            );
        }

        // Filter berdasarkan return_date
        if (query.return_date) {
            const searchTerm = new Date(query.return_date).toISOString().slice(0, 10);
            filteredAssets = filteredAssets.filter(asset => 
                asset.return_date && new Date(asset.return_date).toISOString().slice(0, 10) === searchTerm
            );
        }

        // Filter berdasarkan status
        if (query.status) {
            const searchTerm = query.status.toLowerCase();
            filteredAssets = filteredAssets.filter(asset => 
                asset.status.toLowerCase() === searchTerm
            );
        }

        // Filter berdasarkan notes (optional, if required)
        if (query.notes) {
            const searchTerm = query.notes.toLowerCase();
            filteredAssets = filteredAssets.filter(asset => 
                asset.notes && asset.notes.toLowerCase().includes(searchTerm)
            );
        }

        // Kirim data yang sudah difilter sebagai respons
        res.status(200).json(filteredAssets);
    } catch (error) {
        console.error('Error Pencarian: ', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



module.exports = {
  getAllBorrowedReturnTransaction,
  getBorrowedReturnTransactionById,
  createBorrowedReturnTransaction,
  updateBorrowedReturnTransaction,
  exportBorrowedReturnTransactionToExcel,
  searchPeminjamanPengembalianAsset
}