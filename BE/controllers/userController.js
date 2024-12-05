const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { Op } = require('sequelize'); // Để so sánh ngày giờ
const User = require('../models/User');


// Hàm tạo người dùng mới
const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Hash mật khẩu trước khi lưu
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        // Loại bỏ password trước khi trả về response
        const userResponse = {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
        };

        res.status(201).json(userResponse);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Error creating user' });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!email || !password) {
            return res.status(400).json({ message: 'Missing email or password' });
        }

        // Tìm user theo email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // So sánh mật khẩu
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Tạo token JWT
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET, // Đặt bí mật trong `.env`
            { expiresIn: '1h' } // Token hết hạn sau 1 giờ
        );

        res.status(200).json({ token, user: { id: user.id, username: user.username, email: user.email } });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Error logging in' });
    }
};

const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        // Tìm user theo email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Tạo mã reset token (tạm thời)
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');

        // Lưu mã token vào user (giả sử có cột resetToken và resetTokenExpires trong model User)
        user.resetToken = resetTokenHash;
        user.resetTokenExpires = Date.now() + 3600000; // Token có hiệu lực trong 1 giờ
        await user.save();

        // Gửi email chứa link reset
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Hoặc SMTP server
            auth: {
                user: process.env.EMAIL_USER, // Email server gửi
                pass: process.env.EMAIL_PASS, // Mật khẩu email server
            },
        });

        const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
        const mailOptions = {
            from: 'no-reply@booknest.com',
            to: user.email,
            subject: 'Password Reset Request',
            text: `You requested a password reset. Please click the link to reset your password: ${resetUrl}`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Password reset link sent to email' });
    } catch (error) {
        console.error('Error in forget password:', error);
        res.status(500).json({ message: 'Error processing password reset' });
    }
};

// Reset mật khẩu
const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!token || !newPassword) {
            return res.status(400).json({ message: 'Missing token or new password' });
        }

        // Hash token để tìm user trong DB
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        // Tìm user với token và kiểm tra token có hết hạn không
        const user = await User.findOne({
            where: {
                resetToken: hashedToken,
                resetTokenExpires: { [Op.gt]: Date.now() }, // Token còn hiệu lực
            },
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired reset token' });
        }

        // Hash mật khẩu mới
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Cập nhật mật khẩu mới và xóa token reset
        user.password = hashedPassword;
        user.resetToken = null;
        user.resetTokenExpires = null;
        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        console.error('Error in reset password:', error);
        res.status(500).json({ message: 'Error resetting password' });
    }
};

module.exports = {
    createUser,
    loginUser,
    forgetPassword,
    resetPassword
};