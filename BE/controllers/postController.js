// controllers/postController.js
const { Post, User } = require('../models');
const Category = require('../models/Category');

const createPost = async (req, res) => {
    try {
        const { title, content, emojis, imageUrl, categoryId } = req.body;
        const userId = req.user.id;  // Lấy thông tin người dùng từ middleware

        try {
            // Kiểm tra categoryId hợp lệ
            const category = await Category.findByPk(categoryId);
            if (!category) {
                return res.status(400).json({ message: 'Thể loại không hợp lệ' });
            }

            const post = await Post.create({
                title,
                content,
                imageUrl,
                emojis,
                userId: req.user.id, // Lấy từ token
                categoryId,
            });

            res.status(201).json(post);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi tạo bài viết', error });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error creating post' });
    }
};

const getPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [{
                model: User,
                as: 'user',
                attributes: ['id', 'username'],
            }],
        });

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts' });
    }
};

module.exports = {
    createPost,
    getPosts,
};
