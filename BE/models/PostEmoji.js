// models/PostEmoji.js
const { UUID, UUIDV4 } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const PostEmoji = sequelize.define('PostEmoji', {
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
        },
        emoji: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        postId: {
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

    PostEmoji.associate = function (models) {
        // Mỗi PostEmoji thuộc về một bài viết
        PostEmoji.belongsTo(models.Post, {
            foreignKey: 'postId',
            as: 'post',
        });

        // Mỗi PostEmoji thuộc về một người dùng
        PostEmoji.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
        });
    };

    return PostEmoji;
};
