const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// Create a new Sequelize instance
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres', 
  port: process.env.DB_PORT || 5432,
  logging: false, 
});

const Exercise = require("../../Core/Domain/Entities/Exercise")(sequelize, DataTypes);
const ExerciseInWorkout = require("../../Core/Domain/Entities/ExerciseInWorkout")(sequelize, DataTypes);
const Workout = require("../../Core/Domain/Entities/Workout")(sequelize, DataTypes);
const User = require("../../Core/Domain/Entities/User")(sequelize, DataTypes);
const WorkoutSchedule = require("../../Core/Domain/Entities/WorkoutSchedule")(sequelize, DataTypes);
const Comment = require("../../Core/Domain/Entities/Comments")(sequelize, DataTypes);

const models = {
  Exercise,
  ExerciseInWorkout,
  Workout,
  User,
  WorkoutSchedule,
  Comment
};

Object.values(models).forEach((model) => {
  if (model.associate) {
      model.associate(models);
  }
});

module.exports = { sequelize: sequelize, ...models };