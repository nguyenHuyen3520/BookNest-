// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Lấy tất cả danh mục
router.get('/categories', categoryController.getCategories);

// Lấy danh mục theo ID
router.get('/categories/:id', categoryController.getCategoryById);

module.exports = router;
