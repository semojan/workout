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

async function UpdateWorkoutService(data, workoutId){
    try{
        const workout = await Workouts.findByPk(workoutId);
        if(!workout){
            const error = new Error("workout not found");
            error.status = 404;
            return {message: "workout not found", error: error};
        }

        workout.name = data.name || workout.name;
        workout.description = data.description || workout.description;
        workout.public = data.public || workout.public;
        
        await workout.save();

        return {message: "workout updated successfully"};
    } catch (e){
        return {message: "failed to edit workout", error: e};
    }
}

async function DeleteWorkoutService(){}

async function GetUserWorkoutsService(){}

module.exports = {
    AddWorkoutService: AddWorkoutService,
    UpdateWorkoutService: UpdateWorkoutService,
    DeleteWorkoutService: DeleteWorkoutService,
    GetUserWorkoutsService: GetUserWorkoutsService
};