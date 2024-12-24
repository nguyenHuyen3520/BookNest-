// models/Notification.js
const { UUID, UUIDV4 } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define('Notification', {
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false, // Ví dụ: comment, report, follow
        },
        read: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
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

    Notification.associate = function (models) {
        // Mỗi notification thuộc về một user
        Notification.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
        });
    };

    return Notification;
};
