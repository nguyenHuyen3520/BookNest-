// routes/userRoutes.js
const express = require('express');
const { createUser, forgetPassword, loginUser, resetPassword } = require('../controllers/userController');

const router = express.Router();

router.post('/register', createUser);          // Đăng ký
router.post('/login', loginUser);              // Đăng nhập
router.post('/forget-password', forgetPassword); // Quên mật khẩu
router.post('/reset-password', resetPassword); // Đặt lại mật khẩu

module.exports = router;
