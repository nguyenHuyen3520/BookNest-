// models/Comment.js
module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        timestamps: true,
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
