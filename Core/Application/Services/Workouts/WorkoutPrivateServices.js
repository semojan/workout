const Workouts = require("../../../Domain/Entities/Workout");

async function AddWorkoutService(data, userId){
    try{
        const workout = await Workouts.create({
            name: data.name,
            description: data.description,
            public: data.public,
            totalDuration: 0,
            totalExp: 0,
            creatorId: userId
        });

        return {message: "new workout was added successfully.", workoutId: workout.id};
    }catch(e){
        return {message: "failed to create workout", error: e};
    }
}

async function UpdateWorkoutService(){}

async function DeleteWorkoutService(){}

async function GetUserWorkoutsService(){}

module.exports = {
    AddWorkoutService: AddWorkoutService,
    UpdateWorkoutService: UpdateWorkoutService,
    DeleteWorkoutService: DeleteWorkoutService,
    GetUserWorkoutsService: GetUserWorkoutsService
};