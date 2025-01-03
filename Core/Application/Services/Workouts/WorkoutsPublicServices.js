const {Workout} = require("../../../../Infrastructure/database/db");

const { Op } = require("sequelize");

async function GetAllWorkoutsService(userId){
    try {
        const workouts = await Workout.findAll({
            where: {
                [Op.or]: [
                { public: true },
                { creatorId: userId }
                ]
            }
        });

        return {message: "workouts fetched successfully", workouts: workouts};
    } catch(e){
        return{message: "could not get workouts", error: e};
    }
}

module.exports = {
    GetAllWorkoutsService: GetAllWorkoutsService
};
