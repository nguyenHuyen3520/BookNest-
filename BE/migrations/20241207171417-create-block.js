'use strict';
const { UUID, UUIDV4 } = require('sequelize');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Blocks', {
      id: {
        type: Sequelize.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
      },
      blocker_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      blocked_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW, // Giá trị mặc định là thời gian hiện tại
        field: 'created_at' // Cột trong database sẽ là created_at
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW, // Giá trị mặc định là thời gian hiện tại
        field: 'updated_at' // Cột trong database sẽ là updated_at
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Block');
  }
};
