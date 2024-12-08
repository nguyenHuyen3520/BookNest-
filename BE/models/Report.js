// models/Report.js
module.exports = (sequelize, DataTypes) => {
    const Report = sequelize.define('Report', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        reason: {
            type: DataTypes.STRING,
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

    Report.associate = function (models) {
        // Mỗi report thuộc về một post
        Report.belongsTo(models.Post, {
            foreignKey: 'postId',
            as: 'post',
        });

        // Mỗi report thuộc về một user
        Report.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
        });
    };

    return Report;
};
