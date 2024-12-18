const { DataTypes } = require('sequelize');
const sequelize = require('../../../Infrastructure/database/db');

const ExerciseInWorkout = sequelize.define('ExerciseInWorkout', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true, 
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    order: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    exercise: {
        type: DataTypes.INTEGER,
        allowNull: true, 
        references: {
            model: exercise,
            key: 'id' 
        },
        onDelete: 'CASCADE',
    },
    workout: {
        type: DataTypes.INTEGER,
        allowNull: true, 
        references: {
            model: workouts,
            key: 'id' 
        },
        onDelete: 'CASCADE',
    }
}, {
    tableName: 'exercisesinworkouts',
    timestamps: true,
});

module.exports = ExerciseInWorkout;
