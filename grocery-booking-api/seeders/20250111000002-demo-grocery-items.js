'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('GroceryItems', [
            {
                name: 'Apples',
                price: 50,
                quantity: 100,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Bananas',
                price: 30,
                quantity: 150,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Rice',
                price: 80,
                quantity: 200,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('GroceryItems', null, {});
    },
};
