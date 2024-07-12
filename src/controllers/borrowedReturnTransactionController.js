const { PeminjamanPengembalianAsset, RuangAsetMusholla, RuangAsetAuditorium, RuangAsetPerpustakaan, RuangAsetUtilitas } = require('../models');
const ExcelJS = require('exceljs');

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
      message: 'Berhasil Mendapatkan Semua Transaksi Peminjaman & Pengembalian Aset',
      data: borrowedReturn      
    })
  } catch (error) {
    sendErrorResponse(res, 500, "Gagal mendapatkan transaksi peminjaman & pengembalian aset", error);
  }
};

const getCountBorrowedReturnTransaction = async (req, res) => {
  try {
      const borrowedReturn = await PeminjamanPengembalianAsset.count();
      res.status(200).json({ borrowedReturn });
  } catch (error) {
      handleError(res, error);
  }
};

const getBorrowedReturnTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    const borrowedReturn = await PeminjamanPengembalianAsset.findByPk(id);
    if (!borrowedReturn) {
      return res.status(404).json({ message: 'Peminjaman & pengembalian aset tidak ditemukan' });
    }
    res.status(200).json({
      message: `Berhasil Mendapatkan Transaksi Peminjaman & Pengembalian Aset di ID: ${id}`,
      data: borrowedReturn
    });
  } catch (error) {
    sendErrorResponse(res, 500, "Gagal mendapatkan transaksi peminjaman & pengembalian aset")
  }
}

const tambahPeminjamanAsset = async (req, res) => {
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
          return res.status(404).json({ message: "Aset Tidak Ditemukan." });
      }

      if (asset.asset_type === 'Tidak Dapat Dipindahkan') {
        return res.status(400).json({ message: "Asset Tidak Dapat Dipinjam" });
      }

      if (asset.asset_type === 'Dapat Dipindahkan') {
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
          message: "Peminjaman Aset Berhasil Ditambahkan.",
          data: transaction
        });
      } else {
        return res.status(400).json({ message: "Asset tidak dapat dipinjam karena jenis yang tidak dikenal"})
      }
  } catch (error) {
      sendErrorResponse(res, 500, "Gagal menambahkan peminjaman aset", error);
  }
};


const pengembalianAsset = async (req, res) => {
  try {
    const { 
      borrowed_asset_code, 
      return_date, 
      notes 
    } = req.body;

    // Ambil model aset berdasarkan kode aset yang dipinjam
    const assetModel = getAssetModelByCode(borrowed_asset_code);
    const asset = await assetModel.findOne({ where: { asset_code: borrowed_asset_code } });

    if (!asset) {
      return res.status(404).json({ message: "Asset tidak ditemukan" });
    }

    // Cek apakah ada transaksi peminjaman yang sedang berlangsung untuk aset ini
    const transaction = await PeminjamanPengembalianAsset.findOne({
      where: {
        borrowed_asset_code,
        status: 'Dipinjam'
      }
    });

    if (!transaction) {
      return res.status(400).json({ message: "Tidak ditemukan asset yang sedang dipinjam" });
    }

    // Update transaksi peminjaman menjadi status 'Returned'
    transaction.status = 'Dikembalikan';
    transaction.return_date = return_date;
    transaction.notes = notes;
    await transaction.save();

    res.status(200).json({
      message: "Berhasil mengembalikan aset yang dipinjam",
      data: transaction
    });

  } catch (error) {
    sendErrorResponse(res, 500, "Gagal mengembalian aset", error);
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
      'status',
      'notes'
    ],
  });

  // Prepare data for export
  const formattedData = data.map((asset) => ({
    'ID Peminjaman': asset.borrowed_id,
    'Kode Aset': asset.borrowed_asset_code,
    'Nama Aset': asset.borrowed_asset_name,
    'Nama Peminjam': asset.borrowed_name,
    'Digunakan oleh program': asset.used_by_program,
    'Tanggal Peminjaman': asset.borrowed_date.toLocaleDateString(), // Use localized date format
    'Tanggal Tenggat Peminjaman': asset.due_date.toLocaleDateString(),
    'Tanggal Pengembalian': asset.return_date ? asset.last_maintenance_date.toISOString().split('T')[0] : 'Belum Terdata',
    'Status': asset.status,
    'Notes': asset.notes
  }));

  // Create a new workbook and worksheet
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Peminjaman dan Pengembalian Aset');

  // Add title and date
  worksheet.mergeCells('A1:I1');
  worksheet.getCell('A1').value = 'Laporan Data Transaksi Peminjaman dan Pengembalian Aset';
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
  const filename = `transaksi_peminjaman_pengembalian__asset_${Date.now()}.xlsx`;

  // Write workbook to buffer and send it as response
  const buffer = await workbook.xlsx.writeBuffer();
  setExportHeaders('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', filename);
  res.send(buffer);

} catch (error) {
  console.error('Kesalahan mengexport data:', error);
  res.status(500).send('Kesalahan mengexport data.');
} finally {
  // **Improvement:** No need for cleanup since temporary file is not used
}
};

const searchPeminjamanPengembalianAsset = async (req, res) => {
    const { query } = req;

    try {
        // Ambil semua data dari tabel PeminjamanPengembalianAsset
        const peminjamanPengembalianAssets = await PeminjamanPengembalianAsset.findAll();

        const filteredAssets = peminjamanPengembalianAssets.filter(asset => {
          return Object.keys(query).every(key => {
            const searchValue = query[key].toLowerCase();
            const assetValue = asset[key]?.toString().toLowerCase();
            return assetValue && assetValue.includes(searchValue);
          });
        });

        if (filteredAssets.length === 0) {
          return res.status(404).json({ message: "Tidak kesamaan transaksi ditemukan."});
        }

        // Kirim data yang sudah difilter sebagai respons
        res.status(200).json(filteredAssets);
    } catch (error) {
        console.error('Kesalahan Pencarian Transaksi Peminjaman: ', error);
        res.status(500).json({ message: 'Kesalahan Server Internal.' });
    }
};



module.exports = {
  getAllBorrowedReturnTransaction,
  getCountBorrowedReturnTransaction,
  getBorrowedReturnTransactionById,
  tambahPeminjamanAsset,
  pengembalianAsset,
  exportBorrowedReturnTransactionToExcel,
  searchPeminjamanPengembalianAsset
}