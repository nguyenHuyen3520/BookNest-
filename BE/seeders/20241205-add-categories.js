module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Categories', [
            {
                name: 'Văn học',
                created_at: Sequelize.fn('NOW'),
                updated_at: Sequelize.fn('NOW')
            },
            {
                name: 'Khoa học',
                created_at: Sequelize.fn('NOW'),
                updated_at: Sequelize.fn('NOW')
            },
            {
                name: 'Kỹ năng sống',
                created_at: Sequelize.fn('NOW'),
                updated_at: Sequelize.fn('NOW')
            },
            {
                name: 'Kinh tế',
                created_at: Sequelize.fn('NOW'),
                updated_at: Sequelize.fn('NOW')
            },
            {
                name: 'Lịch sử',
                created_at: Sequelize.fn('NOW'),
                updated_at: Sequelize.fn('NOW')
            }
        ], {});
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Categories', null, {});
    },
};
