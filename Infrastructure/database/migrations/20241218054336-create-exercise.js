'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Creating the "exercise" table
    await queryInterface.createTable('exercise', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      muscleGroup: {
        type: Sequelize.ENUM('chest', 'back', 'legs', 'arms', 'shoulders', 'core', 'cardio'),
        allowNull: false,
      },
      category: {
        type: Sequelize.ENUM('strength', 'cardio', 'mobility', 'endurance'),
        allowNull: false,
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

  async down(queryInterface, Sequelize) {
    // Dropping the "exercise" table
    await queryInterface.dropTable('exercise');

    // Dropping ENUM types created for muscleGroup and category
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_exercise_muscleGroup";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_exercise_category";');
  }
};
