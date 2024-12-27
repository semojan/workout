'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('exercisesinworkout', 'exercise', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'exercise',
        key: 'id',
      },
      onDelete: 'CASCADE',
    });
    await queryInterface.addColumn('exercisesinworkout', 'workout', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'workouts',
        key: 'id',
      },
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('exercisesinworkout', 'exercise');
    await queryInterface.removeColumn('exercisesinworkout', 'workout');
  },
};

