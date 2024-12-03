// controllers/userController.js
const { User } = require('../models');

const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = await User.create({
            username,
            email,
            password, // Cần mã hóa password trước khi lưu
        });

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user' });
    }
};

module.exports = {
    createUser,
};
