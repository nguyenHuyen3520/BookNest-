'use strict';
const { UUID, UUIDV4 } = require('sequelize');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Categories', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
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
    await queryInterface.dropTable('Category');
  }
};
