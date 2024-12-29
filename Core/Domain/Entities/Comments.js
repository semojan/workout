module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true, 
        },
        title:{
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        user: {
            type: DataTypes.INTEGER,
            allowNull: false, 
            references: {
                model: "users",
                key: 'id' 
            },
            onDelete: 'CASCADE',
        },
        workout: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "workouts",
                key: 'id'
            },
            onDelete: 'CASCADE'
        } 
    }, {
        tableName: 'comments',
        timestamps: true,
    });

    Comment.associate = (models) => {
        Comment.belongsTo(models.User, {
            foreignKey: 'user', 
            as: 'author', 
        });
    };    
    
    return Comment;    
};
