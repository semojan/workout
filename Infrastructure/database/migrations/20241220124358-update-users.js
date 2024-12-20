'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'exp', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0, // Set the default value for existing rows
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'exp');
  },
};
