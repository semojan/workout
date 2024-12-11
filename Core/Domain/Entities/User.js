const { DataTypes } = require('sequelize');
const sequelize = require('../../../Infrastructure/database/db');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true, 
    },
    password: {
        type: DataTypes.STRING(225), 
        allowNull: false,
    },
    salt: {
        type: DataTypes.STRING(32), 
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    birthdate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    weight: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    height: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            isEmail: true, // Ensures valid email format
        },
    },
    username: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true, 
    },
    public: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false, 
    },
}, {
    tableName: 'users',
    timestamps: true,
});

module.exports = User;
