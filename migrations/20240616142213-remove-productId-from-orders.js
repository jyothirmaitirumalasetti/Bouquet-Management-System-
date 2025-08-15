'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Orders', 'productId');
    await queryInterface.removeColumn('Orders', 'quantity');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Orders', 'productId', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
  }
};
