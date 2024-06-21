const { Users } = require('../models');
const { tokenReturned } = require('../middlewares/token');
const bcrypt = require('bcryptjs');
const { validateUserProfileData } = require('../services/validateUserProfileData');

const getUserProfile = async (req, res) => {
    try {
        const { data } = tokenReturned(req, res);
        const currentUser = await Users.findById(data.user_id);
        if (!currentUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { password, ...userWithoutPassword } =
            currentUser.toObject();
        return res.status(200).json({
            message: 'Success',
            profile: userWithoutPassword
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

const editUserProfile = async (req, res) => {
    try {

        const { data } = tokenReturned(req, res);

        // Get new data from the request
        const { username, role, first_name, last_name, phone_number, address } = req.body;

        if (!validateUserProfileData(req.body)) {
            return res.status(400),json({ message: 'Invalid user profile data'});
        }

        const currentUser = await Users.findById(data.user_id);
        if (!currentUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        currentUser.username = username;
        currentUser.role = role;
        currentUser.first_name = first_name;
        currentUser.last_name = last_name;
        currentUser.phone_number = phone_number;
        currentUser.address = address;

        await currentUser.save();

        const { password, ...updateUser } = currentUser.toObject();
        return res.status(200).json({
            message: 'Profile updated successfully',
            changeSuccess: updateUser
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error'});
    }
};

const changeUserPassword = async (req, res) => {
    try {
        const { currentPassword, newPassword, confirmPassword } = req.body;
        const { data } = tokenReturned(req, res);
        const currentUser = await Users.findById(data.user_id);

        if (!currentUser) {
            return res.status(404).json({ message: 'User not found'});
        }

        const isMatch = await bcrypt.compare(
            currentPassword,
            currentUser.password
        );

        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrent current password'});
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: 'New password do not match' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        currentPassword.password = hashedPassword;
        await currentPassword.save();

        const { password, ...userWithoutPassword } = currentPassword.toObject();
        res.status.json({
            message: 'Password updated successfully',
            changeSuccess: userWithoutPassword,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error'});
    }
};

module.exports = {
    getUserProfile,
    editUserProfile,
    changeUserPassword
}