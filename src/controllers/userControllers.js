const { Op } = require('sequelize');
const { Users } = require('../models');
const bcrypt = require('bcryptjs');

// Fungsi utilitas untuk menangani kesalahan
const handleError = (res, error, message = 'Kesalahan Server Internal', status = 500) => {
    console.error(error);
    res.status(status).json({ message: message });
};

// Fungsi untuk memvalidasi input user
const validateUserInput = (body) => {
    const requiredFields = ['username', 'password', 'role', 'first_name', 'last_name', 'phone_number', 'address'];
    return requiredFields.every(field => body[field]);
};

// Buat user baru
const createUser = async (req, res) => {
    try {
        const { username, password, role, first_name, last_name, phone_number, address } = req.body;

        if (!validateUserInput(req.body)) {
            return res.status(400).json({ message: 'Data tidak sesuai, mohon cek kembali' });
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

        res.status(201).json({ message: "Data user berhasil ditambahkan", data: newUser });
    } catch (error) {
        handleError(res, error);
    }
};

// Dapatkan semua user
const getAllUsers = async (req, res) => {
    try {
        const users = await Users.findAll();
        res.status(200).json({
            message: "Berhasil mendapatkan semua user",
            data: users
        });
    } catch (error) {
        handleError(res, error);
    }
};

// Dapatkan user berdasarkan ID
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Users.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }

        res.status(200).json({
            message: "Berhasil mendapatkan user berdasarkan ID",
            data: user
        });
    } catch (error) {
        handleError(res, error);
    }
};

// Perbarui user
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, password, role, first_name, last_name, phone_number, address } = req.body;

        const existingUser = await Users.findByPk(id);
        if (!existingUser) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }

        if (!username || !password || !role || !first_name || !last_name || !phone_number || !address ) {
            return res.status(404).json({ message: "Data tidak sesuai, mohon cek kembali "});
        }

        // Perbarui field jika disediakan
        const updateData = { username, role, first_name, last_name, phone_number, address };

        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        await existingUser.update(updateData);
        res.status(200).json({ message: "Data user berhasil diperbarui", data: existingUser });
    } catch (error) {
        handleError(res, error);
    }
};

// Hapus user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Users.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'User tidak ditemukan' });
        }

        await user.destroy();
        res.status(200).json({ message: 'User berhasil dihapus' });
    } catch (error) {
        handleError(res, error);
    }
};

// Cari uUser berdasarkan atribut
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
            return res.status(404).json({ message: 'Tidak ada user yang cocok dengan kriteria pencarian' });
        }

        res.status(200).json({
            message: 'Berhasil menemukan user',
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
