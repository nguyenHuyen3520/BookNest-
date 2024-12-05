// seeders/20241205-add-categories.js
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Categories', [
            { name: 'Văn học' },
            { name: 'Khoa học' },
            { name: 'Kỹ năng sống' },
            { name: 'Kinh tế' },
            { name: 'Lịch sử' },
        ], {});
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Categories', null, {});
    },
};
