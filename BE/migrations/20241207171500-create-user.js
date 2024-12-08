'use strict';

const { v4: uuidv4 } = require('uuid');
const { UUID, UUIDV4 } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.createTable('Users', {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
        },
        firstName: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        lastName: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        profileImage: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        resetToken: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        resetTokenExpires: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        role: {
          type: Sequelize.ENUM('admin', 'user'),
          defaultValue: 'user',
          allowNull: false,
        },
      });

      await queryInterface.bulkInsert('Users', [
        {
          id: uuidv4(),
          firstName: 'Admin',
          lastName: 'AdminUser',
          email: 'admin@gmail.com',
          password: 'admin@123',
          role: 'admin',
        },
        {
          id: uuidv4(),
          firstName: 'Normal',
          lastName: 'NormalUser',
          email: 'user@gmail.com',
          password: 'user@123',
          role: 'user',
        }
      ]);

    } catch (error) {
      console.error('Migration failed:', error);
    }
  },


  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');  // Tên bảng là 'Users'
  }
};
