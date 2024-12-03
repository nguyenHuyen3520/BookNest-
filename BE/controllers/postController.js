// controllers/postController.js
const { Post, User } = require('../models');

const createPost = async (req, res) => {
    try {
        const { title, content, emojis, imageUrl } = req.body;
        const userId = req.user.id;  // Lấy thông tin người dùng từ middleware

        const newPost = await Post.create({
            title,
            content,
            emojis,
            imageUrl,
            userId,
        });

        res.status(201).json(newPost);
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
