const Exercise = require("../../../Domain/Entities/Exercise");

async function GetAllExercisesService(filters = {}) {
    const { category, muscleGroup } = filters;

    const query = {};
    if (category) query.category = category;
    if (muscleGroup) query.muscleGroup = muscleGroup;

    const Exercises = await Exercise.findAll({
        where: query,
    });
    
    return {
        data: Exercises,
        message: "Exercises fetched successfully",
    };
}

module.exports = {
    GetAllExercisesService: GetAllExercisesService
};