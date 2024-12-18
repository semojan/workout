'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('workoutschedules', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      status: {
        type: Sequelize.ENUM('Scheduled', 'Completed', 'Skipped'),
        allowNull: false,
        defaultValue: 'Scheduled',
      },
      schedule: {
        type: Sequelize.DATE,
        allowNull: false,
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
      user: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
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
    await queryInterface.dropTable('workoutschedules');
  },
};

