// routes/postRoutes.js
const express = require('express');
const { createPost, getPosts } = require('../controllers/postController');
const { verifyToken } = require('../middlewares/authController');

const router = express.Router();

router.post('/posts', verifyToken, createPost);  // Tạo bài viết mới
router.get('/posts', getPosts);  // Lấy danh sách bài viết

module.exports = router;
