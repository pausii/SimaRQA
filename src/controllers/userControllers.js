const { Op } = require('sequelize');
const { Users } = require('../models');
const bcrypt = require('bcryptjs');

// Fungsi utilitas untuk menangani kesalahan
const handleError = (res, error, message = 'Kesalahan Server Internal', status = 500) => {
    console.error(error);
    res.status(status).json({ message: message });
};

// Fungsi untuk memvalidasi input pengguna
const validateUserInput = (body) => {
    const requiredFields = ['username', 'password', 'role', 'first_name', 'last_name', 'phone_number', 'address'];
    return requiredFields.every(field => body[field]);
};

// Buat pengguna baru
const createUser = async (req, res) => {
    try {
        const { username, password, role, first_name, last_name, phone_number, address } = req.body;

        if (!validateUserInput(req.body)) {
            return res.status(400).json({ message: 'Semua kolom wajib diisi' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await Users.create({
            username,
            password: hashedPassword,
            role,
            first_name,
            last_name,
            phone_number,
            address
        });

        res.status(201).json({ message: "Registrasi berhasil", data: newUser });
    } catch (error) {
        handleError(res, error);
    }
};

// Dapatkan semua pengguna
const getAllUsers = async (req, res) => {
    try {
        const users = await Users.findAll();
        res.status(200).json({
            message: "Berhasil mendapatkan semua pengguna",
            data: users
        });
    } catch (error) {
        handleError(res, error);
    }
};

// Dapatkan pengguna berdasarkan ID
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Users.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: "Pengguna tidak ditemukan" });
        }

        res.status(200).json({
            message: "Berhasil mendapatkan pengguna berdasarkan ID",
            data: user
        });
    } catch (error) {
        handleError(res, error);
    }
};

// Perbarui pengguna
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, password, role, first_name, last_name, phone_number, address } = req.body;

        const existingUser = await Users.findByPk(id);
        if (!existingUser) {
            return res.status(404).json({ message: "Pengguna tidak ditemukan" });
        }

        // Perbarui field jika disediakan
        const updateData = { username, role, first_name, last_name, phone_number, address };

        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        await existingUser.update(updateData);
        res.status(200).json({ message: "Pengguna berhasil diperbarui", data: existingUser });
    } catch (error) {
        handleError(res, error);
    }
};

// Hapus pengguna
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Users.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
        }

        await user.destroy();
        res.status(200).json({ message: 'Pengguna berhasil dihapus' });
    } catch (error) {
        handleError(res, error);
    }
};

// Cari pengguna berdasarkan atribut
const searchUser = async (req, res) => {
    const {
        username,
        role,
        first_name,
        last_name,
        phone_number,
        address
    } = req.query;

    try {
        const filters = {};
        if (username) filters.username = { [Op.like]: `%${username}%` };
        if (role) filters.role = { [Op.like]: `%${role}%` };
        if (first_name) filters.first_name = { [Op.like]: `%${first_name}%` };
        if (last_name) filters.last_name = { [Op.like]: `%${last_name}%` };
        if (phone_number) filters.phone_number = { [Op.like]: `%${phone_number}%` };
        if (address) filters.address = { [Op.like]: `%${address}%` };

        const users = await Users.findAll({ where: filters });

        if (users.length === 0) {
            return res.status(404).json({ message: 'Tidak ada pengguna yang cocok dengan kriteria pencarian' });
        }

        res.status(200).json({
            message: 'Berhasil menemukan pengguna',
            data: users
        });
    } catch (error) {
        handleError(res, error);
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    searchUser
};
