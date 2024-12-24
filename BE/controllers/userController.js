const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { Op } = require('sequelize'); // Để so sánh ngày giờ
const { User } = require('../models');


// Hàm tạo người dùng mới
const createUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;


        // Hash mật khẩu trước khi lưu
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            first_name: firstName,
            last_name: lastName,
            email,
            password: hashedPassword,
        });

        // Loại bỏ password trước khi trả về response
        const userResponse = {
            id: newUser.id,
            firstName: newUser.first_name,
            lastName: newUser.last_name,
            email: newUser.email,
        };

        return res.status(200).json({ data: userResponse, message: "Đăng ký tài khoản thành công!" });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ message: 'Error creating user' });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("data: ", { email, password })
        // Kiểm tra dữ liệu đầu vào
        if (!email || !password) {
            return res.status(400).json({ message: 'Missing email or password' });
        }

        // Tìm user theo email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'Tài khoản không tồn tạitại' });
        }

        // So sánh mật khẩu
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Mật khẩu sai' });
        }

        // Tạo token JWT
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        return res.status(200).json({
            token, user, message: "Đăng nhập thành công!"
        });
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ message: 'Error logging in' });
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

        return res.status(200).json({ message: 'Password reset link sent to email' });
    } catch (error) {
        console.error('Error in forget password:', error);
        return res.status(500).json({ message: 'Error processing password reset' });
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

        return res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        console.error('Error in reset password:', error);
        return res.status(500).json({ message: 'Error resetting password' });
    }
};

const loginWithToken = async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ where: { id: decoded.id } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({
            message: 'Đăng nhập thành công!',
            user,
            token,
        });
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

module.exports = {
    createUser,
    loginUser,
    forgetPassword,
    resetPassword,
    loginWithToken
};