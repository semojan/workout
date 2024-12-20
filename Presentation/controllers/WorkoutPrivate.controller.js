const services = require("../../Core/Application/Services/Workouts/WorkoutPrivateServices");

async function AddWorkout(req, res, next){
    const data = req.body;
    const userId = req.user.userId;

    result = await services.AddWorkoutService(data, userId);
    
    res.json(result);
}

async function UpdateWorkout(req, res, next){}

async function DeleteWorkout(req, res, next){}

async function GetUserWorkouts(req, res, next){}

module.exports = {
    AddWorkout: AddWorkout,
    UpdateWorkout: UpdateWorkout,
    DeleteWorkout: DeleteWorkout,
    GetUserWorkouts: GetUserWorkouts
};