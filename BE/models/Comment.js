// models/Comment.js
const { UUID, UUIDV4 } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: UUIDV4,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        post_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.UUID,
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

    Comment.associate = function (models) {
        // Một bình luận thuộc về một bài viết
        Comment.belongsTo(models.Post, {
            foreignKey: 'postId',
            as: 'post',
        });
        // Một bình luận thuộc về một user
        Comment.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
        });
    };

    return Comment;
};
