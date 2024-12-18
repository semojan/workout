const { DataTypes } = require('sequelize');
const sequelize = require('../../../Infrastructure/database/db');

const MUSCLE_GROUPS = ['chest', 'back', 'legs', 'arms', 'shoulders', 'core', 'cardio'];
const CATEGORIES = ['strength', 'cardio', 'mobility', 'endurance'];

const Exercise = sequelize.define('Exercise', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true, 
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    muscleGroup: {
        type: DataTypes.ENUM(...MUSCLE_GROUPS),
        allowNull: false,
    },
    category: {
        type: DataTypes.ENUM(...CATEGORIES),
        allowNull: false,
    },    
}, {
    tableName: 'exercise',
    timestamps: true,
});

module.exports = Exercise;
