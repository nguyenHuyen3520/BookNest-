// routes/postRoutes.js
const express = require('express');
const { createPost, getPosts } = require('../controllers/postController');
const { verifyToken } = require('../middlewares/authController');

const router = express.Router();

router.post('/posts', verifyToken, createPost);  // Tạo bài viết mới
router.get('/posts', getPosts);  // Lấy danh sách bài viết
// Lấy danh sách lý do báo cáo
router.get('/reports/reasons', authenticate, getReportReasons);

// Báo cáo bài viết
router.post('/:id/report', authenticate, reportPost);

module.exports = router;
