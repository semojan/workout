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

async function GetForWorkout(req, res, next){
    const workoutId = req.params.workoutId;
    const userId = req.user.userId;

    const result = await ExerciseInWorkoutService.GetForWorkoutService(workoutId, userId);

    res.json(result);
}

module.exports = {
    GetAllExercises: GetAllExercises,
    GetForWorkout: GetForWorkout,
};