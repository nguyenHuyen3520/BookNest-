'use strict';
const { UUID, UUIDV4 } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Notifications', {
      id: {
        type: Sequelize.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
      },
      message: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',  // Tham chiếu đến bảng Users
          key: 'id',       // Khóa ngoại là 'id' trong bảng Users
        },
        onDelete: 'CASCADE',  // Khi xóa người dùng, các thông báo của họ cũng bị xóa
        onUpdate: 'CASCADE',  // Cập nhật thông tin người dùng khi thay đổi
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false, // Ví dụ: comment, report, follow
      },
      read: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    await queryInterface.dropTable('Notifications');  // Xóa bảng Notifications khi rollback migration
  }
};
