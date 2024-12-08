const { UUID, UUIDV4 } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: UUID,
            primaryKey: true,
            defaultValue: UUIDV4, // Tạo UUID tự động
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        profileImage: {
            type: DataTypes.STRING,
            allowNull: true,  // URL ảnh đại diện
        },
        resetToken: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        resetTokenExpires: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        role: {
            type: DataTypes.ENUM('admin', 'user'), // Thêm enum để chọn role
            defaultValue: 'user', // Mặc định là 'user'
            allowNull: false
        },
    }, {
        timestamps: true,
    });

    User.associate = function (models) {
        // Mỗi user có nhiều bài viết
        User.hasMany(models.Post, {
            foreignKey: 'userId',
            as: 'posts',
        });
    };

    return User;
};
