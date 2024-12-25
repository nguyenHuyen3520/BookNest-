const { UUID, UUIDV4 } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        id: {
            type: UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        image_url: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: ''
        },
        emoji_list: { // Đổi tên từ emojis để tránh trùng lặp
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'pending',
        },
        category_id: {
            type: UUID,
            allowNull: false,
        },
        banned: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        user_id: {
            type: UUID,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW, // Giá trị mặc định là thời gian hiện tại
            field: 'created_at' // Cột trong database sẽ là created_at
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW, // Giá trị mặc định là thời gian hiện tại
            field: 'updated_at' // Cột trong database sẽ là updated_at
        }
    }, {
        timestamps: true,
        underscored: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
    });

    Post.associate = function (models) {
        Post.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
        });

        Post.hasMany(models.PostEmoji, {
            foreignKey: 'postId',
            as: 'emojis', // Tên liên kết vẫn giữ nguyên
        });

        Post.hasMany(models.Report, { as: 'reports', foreignKey: 'postId' });
    };

    return Post;
};
