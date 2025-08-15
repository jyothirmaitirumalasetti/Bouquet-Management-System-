'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'name', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.addColumn('Users', 'email', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.addColumn('Users', 'address', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.addColumn('Users', 'phoneNumber', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.addColumn('Users', 'isAdmin', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'name');
    await queryInterface.removeColumn('Users', 'email');
    await queryInterface.removeColumn('Users', 'address');
    await queryInterface.removeColumn('Users', 'phoneNumber');
    await queryInterface.removeColumn('Users', 'isAdmin');
  }
};
