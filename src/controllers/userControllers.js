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

const searchUser = async (req, res) => {
    const { query } = req;

    try {
        const users = await Users.findAll();

        let filteredUsers = users;

        if (query.username) {
            const searchTerm = query.username.toLowerCase();
            filteredUsers = filteredUsers.filter(user => user.username.toLowerCase().includes(searchTerm));
        }

        if (query.role) {
            const searchTerm = query.role.toLowerCase();
            filteredUsers = filteredUsers.filter(user => user.role.toLowerCase().includes(searchTerm));
        }

        if (query.first_name) {
            const searchTerm = query.first_name.toLowerCase();
            filteredUsers = filteredUsers.filter(user => user.first_name.toLowerCase().includes(searchTerm));
        }

        if (query.last_name) {
            const searchTerm = query.last_name.toLowerCase();
            filteredUsers = filteredUsers.filter(user => user.last_name.toLowerCase().includes(searchTerm));
        }

        if (query.phone_number) {
            const searchTerm = query.phone_number.toLowerCase();
            filteredUsers = filteredUsers.filter(user => user.phone_number.toLowerCase().includes(searchTerm));
        }

        if (query.address) {
            const searchTerm = query.address.toLowerCase();
            filteredUsers = filteredUsers.filter(user => user.address.toLowerCase().includes(searchTerm));
        }

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error('Error Pencarian: ', error);
        res.status(500).json({ message: 'Internal server error'});
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    searchUser
};
