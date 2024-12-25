// controllers/categoryController.js
const { Category } = require('../models'); // Import model Category

const getCategories = async (req, res) => {
    try {
        console.log("in getCategories")
        const categories = await Category.findAll(); // Lấy tất cả categories từ DB
        return res.status(200).json({
            data: categories
        }); // Trả về danh sách categories
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Lỗi khi lấy danh mục' }); // Trả về lỗi nếu có
    }
};


const getCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Category.findByPk(id); // Lấy category theo ID
        if (!category) {
            return res.status(404).json({ message: 'Danh mục không tồn tại' }); // Nếu không tìm thấy
        }
        res.status(200).json(category); // Trả về category nếu tìm thấy
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi lấy danh mục' }); // Trả về lỗi nếu có
    }
};

module.exports = {
    getCategories,
    getCategoryById
};
