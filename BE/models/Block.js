// models/Block.js
const { UUID, UUIDV4 } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const Block = sequelize.define('Block', {
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
        },
        blocker_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        blocked_id: {
            type: DataTypes.UUID,
            allowNull: false,
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
