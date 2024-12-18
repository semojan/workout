'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('comments', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      text: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users', // Ensure the table name is 'users' for user reference
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      workout: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'workouts', // Ensure the table name is 'workoutschedule' for workout reference
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
    await queryInterface.dropTable('comments');
  },
};

