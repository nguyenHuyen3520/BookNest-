'use strict';
const { UUID, UUIDV4 } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Comments', {
      id: {
        type: Sequelize.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      post_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Posts',  // Tham chiếu đến bảng Posts
          key: 'id',       // Khóa ngoại là 'id' trong bảng Posts
        },
        onDelete: 'CASCADE',  // Khi xóa bài viết, các bình luận cũng bị xóa
        onUpdate: 'CASCADE',  // Cập nhật thông tin khi bài viết thay đổi
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',  // Tham chiếu đến bảng Users
          key: 'id',       // Khóa ngoại là 'id' trong bảng Users
        },
        onDelete: 'CASCADE',  // Khi xóa người dùng, các bình luận của họ cũng bị xóa
        onUpdate: 'CASCADE',  // Cập nhật thông tin khi người dùng thay đổi
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
    await queryInterface.dropTable('Comments');  // Xóa bảng Comments khi rollback migration
  }
};
