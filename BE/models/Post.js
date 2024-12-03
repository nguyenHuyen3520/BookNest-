// models/Post.js
module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        imageUrl: {
            type: DataTypes.STRING,  // Lưu đường dẫn tới ảnh
            allowNull: true,         // Ảnh là tùy chọn
        },
        emojis: {
            type: DataTypes.STRING,  // Lưu chuỗi emojis
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'pending', // Trạng thái bài viết (pending, approved, rejected)
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    Post.associate = function (models) {
        // Một bài viết thuộc về một user
        Post.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
        });
    };

    return Post;
};
