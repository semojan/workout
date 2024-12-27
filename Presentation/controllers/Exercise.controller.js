const ExerciseInWorkoutService = require("../../Core/Application/Services/ExerciseInWorkout/ExerciseInWorkoutService");

async function AddToWorkout(req, res, next){
    const data = [
        req.body.workoutId,
        req.body.exerciseId,
        req.body.duration,
        req.body.order,
    ];

    const userId = req.user.userId;

    const result = await ExerciseInWorkoutService.AddExerciseInWorkoutService( ...data , userId);

    res.json(result);
}

async function DeleteFromWorkout(req, res, next) {
    
}

module.exports = {
    AddToWorkout: AddToWorkout,
    DeleteFromWorkout: DeleteFromWorkout
};