const ExerciseService = require("../../Core/Application/Services/Exercises/ExerciseService");
const ExerciseInWorkoutService = require("../../Core/Application/Services/ExerciseInWorkout/ExerciseInWorkoutService");

async function GetAllExercises(req, res, next){
    const filters = {
        category: req.query.category,
        muscleGroup: req.query.muscleGroup,
    };
    
    const result = await ExerciseService.GetAllExercisesService(filters);
    res.json(result);    
};

async function AddToWorkout(req, res, next){
    const data = [
        req.body.workoutId,
        req.body.exerciseId,
        req.body.duration,
        req.body.order,
    ];
    const result = await ExerciseInWorkoutService.AddExerciseInWorkoutService( ...data );

    res.json(result);
}

module.exports = {
    GetAllExercises: GetAllExercises,
    AddToWorkout: AddToWorkout,
};