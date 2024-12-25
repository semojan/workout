const services = require("../../Core/Application/Services/Workouts/WorkoutPrivateServices");

async function AddWorkout(req, res, next){
    const data = req.body;
    const userId = req.user.userId;

    result = await services.AddWorkoutService(data, userId);
    
    res.json(result);
}

async function UpdateWorkout(req, res, next){
    const workoutId = req.params.id;
    const data = req.body;

    result = await services.UpdateWorkoutService(data, workoutId);
    
    res.json(result);
}

async function DeleteWorkout(req, res, next){}

async function GetUserWorkouts(req, res, next){}

module.exports = {
    AddWorkout: AddWorkout,
    UpdateWorkout: UpdateWorkout,
    DeleteWorkout: DeleteWorkout,
    GetUserWorkouts: GetUserWorkouts
};