'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Users', [
            {
                name: 'Admin',
                email: 'admin@example.com',
                password: 'admin_password',
                role: 'ADMIN',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'User1',
                email: 'user1@example.com',
                password: 'user_password',
                role: 'USER',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Users', null, {});
    },
};
