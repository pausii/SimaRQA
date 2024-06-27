const { Users } = require('../models');
const bcrypt = require('bcryptjs');
const { tokenGenerated } = require('../middlewares/token'); 

const login = async (req, res) => {
    try {
        // get data from user
        let { username, password } = req.body;
        
        // check is user exist
        const user = await Users.findOne({ where: { username: username }});
        if (user === null) {
            return res.status(404).json({ message: 'User tidak ditemukan, mohon cek kembali'});
        }

        const passwordChecked = bcrypt.compareSync(
            password, 
            user.password
        );

        if (username === false) {
            return res.status(401).json({
                message: 'Username Anda Salah, Mohon Cek Kembali'
            });
        }

        if (passwordChecked === false) {
            return res.status(401).json({
                message: 'Password Anda Salah, Mohon Cek Kembali'
            });
        }

        const token = {
            user_id: user.user_id,
            role: user.role,
        };

        const tokenCreated = tokenGenerated(token);

        const data = {
            message: 'Login Success',
            body: {
                user_id: user.user_id,
                token: tokenCreated,
                username: user.username,
                password: user.password,
                role: user.role,
                first_name: user.first_name,
                last_name: user.last_name,
                phone_number: user.phone_number,
                address: user.address
            },
        };

        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};



module.exports = {
    login
}