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
            type: DataTypes.STRING(2048),
            allowNull: true,
        },
        emojis: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'pending',
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        categoryId: { // Thêm khóa ngoại cho thể loại
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        timestamps: true,
    });

    Post.associate = function (models) {
        // Một bài viết thuộc về một user
        Post.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
        });
        // Một bài viết thuộc về một thể loại
        Post.belongsTo(models.Category, {
            foreignKey: 'categoryId',
            as: 'category',
        });
    };

    return Post;
};
