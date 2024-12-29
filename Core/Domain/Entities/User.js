module.exports = (sequelize, DataTypes) => {
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
                isEmail: true, 
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
        exp:{
            type: DataTypes.INTEGER,
            allowNull:false,
            defaultValue: 0,
        }
    }, {
        tableName: 'users',
        timestamps: true,
    });

    User.associate = (models) => {
        User.hasMany(models.Comment, {
            foreignKey: 'user', 
            as: 'comments', 
        });
    };    
 
    return User;
};
