'use strict';

const { v4: uuidv4 } = require('uuid');
const { UUID, UUIDV4 } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.createTable('Users', {
        id: {
          type: UUID,
          primaryKey: true,
          defaultValue: UUIDV4, // Tạo UUID tự động
        },
        first_name: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        last_name: {
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
        profile_image: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: 'https://firebasestorage.googleapis.com/v0/b/server-image-b9408.appspot.com/o/images%2FCNPM%2Favatar-1.png?alt=media&token=ff6ba3f7-9f8c-42b2-82c1-f45a7808732a'
        },
        reset_token: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        reset_token_expires: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        role: {
          type: Sequelize.ENUM('admin', 'user'), // Thêm enum để chọn role
          defaultValue: 'user', // Mặc định là 'user'
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

      await queryInterface.bulkInsert('Users', [
        {
          id: uuidv4(),
          first_name: 'Admin',
          last_name: 'AdminUser',
          email: 'admin@gmail.com',
          password: 'admin@123',
          role: 'admin',
        },
        {
          id: uuidv4(),
          first_name: 'Normal',
          last_name: 'NormalUser',
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
