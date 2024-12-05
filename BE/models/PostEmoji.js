// models/PostEmoji.js
module.exports = (sequelize, DataTypes) => {
    const PostEmoji = sequelize.define('PostEmoji', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        emoji: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
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
