// models/Notification.js
module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define('Notification', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
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
