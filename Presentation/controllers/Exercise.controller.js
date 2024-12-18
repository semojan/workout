const ExerciseService = require("../../Core/Application/Services/Exercises/ExerciseService");

async function GetAllExercises(req, res, next){
    const filters = {
        category: req.query.category,
        muscleGroup: req.query.muscleGroup,
    };
    
    const result = await ExerciseService.GetAllExercisesService(filters);
    res.json(result);    
};

module.exports = {
    GetAllExercises: GetAllExercises
};