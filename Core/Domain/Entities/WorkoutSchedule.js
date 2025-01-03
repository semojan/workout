const STATUS = ['Scheduled', 'Completed', 'Skipped'];

module.exports = (sequelize, DataTypes) => {
    const WorkoutSchedule = sequelize.define('WorkoutSchedule', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true, 
        },
        status: {
            type: DataTypes.ENUM(...STATUS),
            allowNull: false,
            defaultValue: 'Scheduled'
        },
        schedule: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        workout: {
            type: DataTypes.INTEGER,
            allowNull: false, 
            references: {
                model: "workouts",
                key: 'id' 
            },
            onDelete: 'CASCADE',
        },
        user: {
            type: DataTypes.INTEGER,
            allowNull: false, 
            references: {
                model: "users",
                key: 'id' 
            },
            onDelete: 'CASCADE',
        }
    }, {
        tableName: 'workoutschedules',
        timestamps: true,
    });

    return WorkoutSchedule;
};
