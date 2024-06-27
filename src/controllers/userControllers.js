const { Op } = require('sequelize');
const { Users } = require('../models');
const bcrypt = require('bcryptjs');

// Utility function to handle errors
const handleError = (res, error, message = 'Internal Server Error', status = 500) => {
    console.error(error);
    res.status(status).json({ message });
};

// Function to validate request body
const validateUserInput = (body) => {
    const requiredFields = ['username', 'password', 'role', 'first_name', 'last_name', 'phone_number', 'address'];
    return requiredFields.every(field => body[field]);
};

// Create new user
const createUser = async (req, res) => {
    try {
        const { username, password, role, first_name, last_name, phone_number, address } = req.body;

        if (!validateUserInput(req.body)) {
            return res.status(400).json({ error: 'All fields are required' });
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

        res.status(201).json({ message: "Registration successful", data: newUser });
    } catch (error) {
        handleError(res, error);
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await Users.findAll();
        res.status(200).json({
            message: "Get All Users Successfully",
            data: users
        });
    } catch (error) {
        handleError(res, error);
    }
};

// Get user by ID
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Users.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }

        res.status(200).json({
            message: "Get User By Id Successfully",
            data: user
        });
    } catch (error) {
        handleError(res, error);
    }
};

// Update user
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, password, role, first_name, last_name, phone_number, address } = req.body;
        
        const existingUser = await Users.findByPk(id);
        if (!existingUser) {
            return res.status(404).json({ message: "User Not Found" });
        }

        // Update fields if provided
        const updateData = { username, role, first_name, last_name, phone_number, address };

        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        await existingUser.update(updateData);
        res.status(200).json({ message: "User Updated Successfully", data: existingUser });
    } catch (error) {
        handleError(res, error);
    }
};

// Delete user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Users.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'User Not Found' });
        }

        await user.destroy();
        res.status(200).json({ message: 'User Deleted Successfully' });
    } catch (error) {
        handleError(res, error);
    }
};


/**
 * Fungsi untuk mencari pengguna berdasarkan atribut.
 * @param {Object} req - Objek request dari Express.
 * @param {Object} res - Objek response dari Express.
 */

const searchUser = async (req, res) => {
    const { 
        username,
        role,
        first_name,
        last_name,
        phone_number,
        address
     } = req.query;

    const filters = {};
    if (username) filters.username = { [Op.like]: `${username}`};
    if (role) filters.role = { [Op.like]: `${role}`};
    if (first_name) filters.first_name = { [Op.like]: `${first_name}`};
    if (last_name) filters.last_name = { [Op.like]: `${last_name}`};
    if (phone_number) filters.phone_number = { [Op.like]: `${phone_number}`};
    if (address) filters.address = { [Op.like]: `${address}`};

    const users = await Users.findAll({
        where: filters
    });

    res.status(200).json(users);
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    searchUser
};
