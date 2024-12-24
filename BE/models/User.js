const { UUID, UUIDV4 } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: UUID,
            primaryKey: true,
            defaultValue: UUIDV4, // Tạo UUID tự động
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        last_name: {
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
        profile_image: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'https://firebasestorage.googleapis.com/v0/b/server-image-b9408.appspot.com/o/images%2FCNPM%2Favatar-1.png?alt=media&token=ff6ba3f7-9f8c-42b2-82c1-f45a7808732a'
        },
        reset_token: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        reset_token_expires: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        role: {
            type: DataTypes.ENUM('admin', 'user'), // Thêm enum để chọn role
            defaultValue: 'user', // Mặc định là 'user'
            allowNull: false
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

    User.associate = function (models) {
        // Mỗi user có nhiều bài viết
        User.hasMany(models.Post, {
            foreignKey: 'userId',
            as: 'posts',
        });
    };

    return User;
};
