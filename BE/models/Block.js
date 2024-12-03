// models/Block.js
module.exports = (sequelize, DataTypes) => {
    const Block = sequelize.define('Block', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        blockerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        blockedId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    Block.associate = function (models) {
        // Mỗi block thuộc về một user
        Block.belongsTo(models.User, {
            foreignKey: 'blockerId',
            as: 'blocker',
        });

        Block.belongsTo(models.User, {
            foreignKey: 'blockedId',
            as: 'blocked',
        });
    };

    return Block;
};
