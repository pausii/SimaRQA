const { Users } = require('../models');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

module.exports = {
    getUserProfile: async (req, res) => {
      try {
        const userId = req.user.user_id;
        const user = await Users.findByPk(userId, {
          attributes: { exclude: ['password'] },
        });
        console.log(user);
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
  
    updateUserProfile: async (req, res) => {
      try {
        const userId = req.user.user_id;
        const { first_name, last_name, phone_number, address } = req.body;

        if (!first_name || !last_name || !phone_number || !address) {
          return res.status(404).json({ message: 'Field tidak sesuai, mohon perbaiki'});
        }
  
        const user = await Users.findByPk(userId);
        if (user) {
          user.first_name = first_name || user.first_name;
          user.last_name = last_name || user.last_name;
          user.phone_number = phone_number || user.phone_number;
          user.address = address || user.address;
  
          await user.save();
          res.status(200).json({ message: 'Data Profile telah di update' });
        } else {
          res.status(404).json({ message: 'Profile tidak ditemukan' });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
  
    changeUserPassword: async (req, res) => {
      try {
        const userId = req.user.user_id;
        const { currentPassword, newPassword, confirmPassword } = req.body;
  
        const user = await Users.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User tidak ditemukan'});
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Password lama salah, mohon cek kembali'});
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: 'Password baru tidak sama'});
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        await user.save();

        const {password, ...userWithoutPassword } = user.toJSON();
        
        res.status(200).json({
            message: 'Password telah diupdate',
            updatedUser: userWithoutPassword
        })
      } catch (error) {
        res.status(500).json({ message: 'Kesalahan Server Internal' });
      }
    },
  };
  