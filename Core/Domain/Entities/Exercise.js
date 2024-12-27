const MUSCLE_GROUPS = ['chest', 'back', 'legs', 'arms', 'shoulders', 'core', 'cardio'];
const CATEGORIES = ['strength', 'cardio', 'mobility', 'endurance'];

module.exports = (sequelize, DataTypes) => {
    
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

    Exercise.associate = (models) => {
        Exercise.hasMany(models.ExerciseInWorkout, {
            foreignKey: 'exercise',
            as: 'exercisesInWorkout',
        });
    };

    return Exercise;
};
