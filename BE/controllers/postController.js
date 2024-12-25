// controllers/postController.js
const { Post, User, Report, PostEmoji } = require('../models');
const multer = require('multer');
const upload = multer();
const uploadImageToFirebase = require('../firebase/firebaseUtils'); // Giả sử bạn có một hàm upload ảnh lên Firebase

const reportReasons = [
    { id: 1, reason: 'Nội dung không phù hợp' },
    { id: 2, reason: 'Spam hoặc quảng cáo' },
    { id: 3, reason: 'Thông tin sai lệch' },
    { id: 4, reason: 'Ngôn từ kích động thù địch' },
    { id: 5, reason: 'Vi phạm bản quyền' },
];

// Lấy danh sách lý do báo cáo
const getReportReasons = (req, res) => {
    return res.status(200).json(reportReasons);
};

// Báo cáo bài viết
const reportPost = async (req, res) => {
    try {
        const { id } = req.params; // ID của bài viết
        const { reasonId } = req.body; // ID lý do từ phía client
        const userId = req.user.id;

        // Kiểm tra xem lý do có hợp lệ không
        const reason = reportReasons.find((r) => r.id === reasonId);
        if (!reason) {
            return res.status(400).json({ message: 'Lý do báo cáo không hợp lệ' });
        }

        const post = await Post.findByPk(id);
        if (!post) {
            return res.status(404).json({ message: 'Bài viết không tồn tại' });
        }

        // Tạo báo cáo
        const report = await Report.create({
            reason: reason.reason,
            userId,
            postId: id,
        });

        return res.status(201).json({ message: 'Báo cáo bài viết thành công', report });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Lỗi khi báo cáo bài viết', error });
    }
};

// Tạo bài viết mới
const createPost = async (req, res) => {
    console.log("in createPost: ", req);
    try {
        const { title, content, categoryId } = req.body;
        const userId = req.user.id;

        let data = { title, content, user_id: userId, category_id: categoryId };

        if (req.file) {
            const newImageUrl = await uploadImageToFirebase(req.file.buffer, req.file.mimetype);
            data.image_url = newImageUrl;
        }

        // Tạo bài viết trong cơ sở dữ liệu
        const post = await Post.create(data);

        return res.status(201).json({ message: 'Tạo bài viết thành công', post });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Lỗi khi tạo bài viết', error });
    }
};

// Cập nhật bài viết
const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, imageUrl } = req.body;

        const post = await Post.findByPk(id);
        if (!post) {
            return res.status(404).json({ message: 'Bài viết không tồn tại' });
        }

        if (post.userId !== req.user.id) {
            return res.status(403).json({ message: 'Không có quyền chỉnh sửa bài viết này' });
        }

        // Cập nhật bài viết
        await post.update({ title, content, image_url: imageUrl });
        return res.status(200).json({ message: 'Cập nhật bài viết thành công', post });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Lỗi khi cập nhật bài viết', error });
    }
};

// Xóa bài viết
const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await Post.findByPk(id);
        if (!post) {
            return res.status(404).json({ message: 'Bài viết không tồn tại' });
        }

        if (post.userId !== req.user.id && !req.user.isAdmin) {
            return res.status(403).json({ message: 'Không có quyền xóa bài viết này' });
        }

        // Xóa bài viết
        await post.destroy();
        return res.status(200).json({ message: 'Xóa bài viết thành công' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Lỗi khi xóa bài viết', error });
    }
};

// Thêm emoji vào bài viết
const addEmoji = async (req, res) => {
    try {
        const { id } = req.params; // ID bài viết
        const { emoji } = req.body;
        const userId = req.user.id;

        await PostEmoji.create({ emoji, userId, postId: id });
        return res.status(201).json({ message: 'Thêm emoji thành công' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Lỗi khi thêm emoji', error });
    }
};

// Cấm bài viết (banned)
const banPost = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await Post.findByPk(id);
        if (!post) {
            return res.status(404).json({ message: 'Bài viết không tồn tại' });
        }

        await post.update({ isBanned: true });
        return res.status(200).json({ message: 'Bài viết đã bị cấm' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Lỗi khi cấm bài viết', error });
    }
};

// Mở lại bài viết (unbanned)
const unbanPost = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await Post.findByPk(id);
        if (!post) {
            return res.status(404).json({ message: 'Bài viết không tồn tại' });
        }

        await post.update({ isBanned: false });
        return res.status(200).json({ message: 'Bài viết đã được mở lại' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Lỗi khi mở lại bài viết', error });
    }
};

// Lấy danh sách bài viết
const getPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
            where: { isBanned: false }, // Lọc các bài viết chưa bị cấm
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'username', 'email'],
                },
                {
                    model: PostEmoji,
                    as: 'emojis',
                    attributes: ['id', 'emoji', 'userId'],
                },
                {
                    model: Report,
                    as: 'reports',
                    attributes: ['id', 'reason', 'userId'],
                },
            ],
            order: [['createdAt', 'DESC']], // Sắp xếp theo thời gian tạo mới nhất
        });

        return res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Lỗi khi lấy danh sách bài viết', error });
    }
};

module.exports = {
    createPost,
    updatePost,
    deletePost,
    reportPost,
    addEmoji,
    banPost,
    unbanPost,
    getReportReasons,
    getPosts
};
