// models/Category.js
module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        timestamps: false, // Không cần createdAt và updatedAt cho bảng này
    });

    Category.associate = function (models) {
        // Một thể loại có thể có nhiều bài viết
        Category.hasMany(models.Post, {
            foreignKey: 'categoryId',
            as: 'posts',
        });
    };

    return Category;
};
