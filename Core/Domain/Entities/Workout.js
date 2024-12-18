const { DataTypes } = require('sequelize');
const sequelize = require('../../../Infrastructure/database/db');

const Workout = sequelize.define('Workout', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true, 
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    public: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false, 
    },
    totalDuration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    totalExp: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    creatorId: {
        type: DataTypes.INTEGER,
        allowNull: true, 
        references: {
            model: users,
            key: 'id' 
        },
        onDelete: 'SET NULL',
    }    
}, {
    tableName: 'workouts',
    timestamps: true,
});

module.exports = Workout;
