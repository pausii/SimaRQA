const { 
    CategoryAsset, 
    RuangAsetAuditorium, 
    RuangAsetMusholla, 
    RuangAsetPerpustakaan, 
    RuangAsetUtilitas 
} = require('../models');
const { Op } = require('sequelize');

// Fungsi utility untuk menangani kesalahan
const handleError = (res, error, message = 'Terjadi kesalahan pada server', status = 500) => {
    console.error(error);
    res.status(status).json({ message: message });
};  

// Fungsi untuk memvalidasi input kategori
const validateCategoryInput = (body) => {
    const { category_name } = body;
    return category_name && category_name.trim() !== '';
};

// Membuat kategori baru
const createCategory = async (req, res) => {
    try {
        const { category_name } = req.body;

        if (!validateCategoryInput(req.body)) {
            return res.status(400).json({ message: 'Nama kategori harus diisi' });
        }

        const newCategory = await CategoryAsset.create({ category_name });
        res.status(201).json({ 
            message: "Kategori berhasil ditambahkan", 
            data: newCategory 
        });
    } catch (error) {
        handleError(res, error);
    }
};

// Mendapatkan semua kategori
const getAllCategory = async (req, res) => {
    try {
        const categories = await CategoryAsset.findAll();
        res.status(200).json({
            message: "Berhasil mendapatkan semua kategori",
            data: categories
        });
    } catch (error) {
        handleError(res, error);
    }
};

const getCountCategory = async (req, res) => {
    try {
        const categories = await CategoryAsset.count();
        res.status(200).json({ categories });
    } catch (error) {
        handleError(res, error);
    }
};

// Mendapatkan kategori berdasarkan ID
const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await CategoryAsset.findByPk(id);

        if (!category) {
            return res.status(404).json({ message: "Kategori tidak ditemukan" });
        }

        res.status(200).json({
            message: "Berhasil mendapatkan kategori berdasarkan ID",
            data: category
        });
    } catch (error) {
        handleError(res, error);
    }
};

// Memperbarui kategori
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { category_name } = req.body;

        if (!validateCategoryInput(req.body)) {
            return res.status(400).json({ message: 'Kategori tidak sesuai, mohon cek kembali' });
        }

        const existingCategory = await CategoryAsset.findByPk(id);

        if (!existingCategory) {
            return res.status(404).json({ message: 'Kategori tidak ditemukan' });
        }

        existingCategory.category_name = category_name;
        await existingCategory.save();

        res.status(200).json({
            message: 'Kategori berhasil diperbarui',
            data: existingCategory
        });
    } catch (error) {
        handleError(res, error);
    }
};

// Menghapus kategori
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await CategoryAsset.findByPk(id);

        if (!category) {
            return res.status(404).json({ message: 'Kategori tidak ditemukan' });
        }

        const childTables = [
            { model: RuangAsetAuditorium, message: 'Data Ruang Aset Auditorium' },
            { model: RuangAsetMusholla, message: 'Data Ruang Aset Musholla' },
            { model: RuangAsetPerpustakaan, message: 'Data Ruang Aset Perpustakaan' },
            { model: RuangAsetUtilitas, message: 'Data Ruang Aset Utilitas' },
        ];

        // Periksa relasi di setiap tabel anak
        for (const table of childTables) {
            const relatedAssets = await table.model.findAll({ where: { category_id: id }});
            if (relatedAssets.length > 0) {
                return res.status(400).json({ 
                    message: `Kategori tidak dapat dihapus karena memiliki relasi dengan satu atau lebih aset di ${table.message}`
                });
            }
        }

        await category.destroy();
        res.status(200).json({ message: 'Kategori berhasil dihapus' });
    } catch (error) {
        handleError(res, error);
    }
};

// Mencari kategori berdasarkan kriteria
const searchCategory = async (req, res) => {
    const {
        category_name
    } = req.query;

    try {
        const filters = {};
        if (category_name) filters.category_name = { [Op.like]: `%${category_name}%` };
        
        const category = await CategoryAsset.findAll({ where: filters });

        if (category.length === 0) {
            return res.status(404).json({ message: 'Tidak ada pengguna yang cocok dengan kriteria pencarian' });
        }

        res.status(200).json({
            message: 'Berhasil menemukan kategori',
            data: category
        });
    } catch (error) {
        handleError(res, error);
    }
};


module.exports = {
    createCategory,
    getAllCategory,
    getCategoryById,
    getCountCategory,
    updateCategory,
    deleteCategory,
    searchCategory
};
