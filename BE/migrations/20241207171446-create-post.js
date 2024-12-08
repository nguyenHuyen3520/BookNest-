'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Posts', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      imageUrl: {
        type: Sequelize.STRING,  // Lưu đường dẫn tới ảnh
        allowNull: true,         // Ảnh là tùy chọn
      },
      emojis: {
        type: Sequelize.STRING,  // Lưu chuỗi emojis
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'pending', // Trạng thái bài viết (pending, approved, rejected)
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Post');
  }
};
