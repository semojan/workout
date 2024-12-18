'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('exercisesinworkout', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      order: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      exercise: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'exercise',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      workout: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'workouts',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('exercisesinworkout');
  },
};
