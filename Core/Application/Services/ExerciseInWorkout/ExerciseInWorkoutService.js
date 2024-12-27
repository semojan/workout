const {Workout, Exercise, ExerciseInWorkout} = require("../../../../Infrastructure/database/db");
const { Op } = require("sequelize");

async function AddExerciseInWorkoutService(workoutId, exerciseId, duration, order, userId){
    const workout = await Workout.findOne({where: {id: workoutId}});
    if (!workout){
        const err = new Error("the workout to add exercise does not exist");
        err.status = 404;
        return {message: "workout not found", error: err};
    }

    if (workout.creatorId !== userId){
        const err = new Error("you do not have permission to change this workout");
        err.status = 403;
        return {message: "no permission", error: err};
    }

    const exercise = await Exercise.findOne({where: {id: workoutId}});
    if (!exercise){
        const err = new Error("the exercise to add does not exist");
        err.status = 404;
        return {message: "exercise not found", error: err};
    }

    try{
        const exerciseInWorkout = await ExerciseInWorkout.create({
            duration: duration,
            order: order || null,
            exercise: exerciseId,
            workout: workoutId
        });

        workout.totalDuration += duration;
        workout.totalExp = parseInt((workout.totalDuration / 4).toFixed(0), 10);

        await workout.save();
        return { message: "Exercise added to workout successfully" };
    }catch(e){
        console.log(e)
        return {message: "adding exercise failed", error: e};
    }
}

async function GetForWorkoutService(workoutId, userId) {
    try{
        const workout = await Workout.findByPk(workoutId);
        if (!workout){
            const err = new Error("the workout to add exercise does not exist");
            err.status = 404;
            return {message: "workout not found", error: err};
        }

        if (workout.public === false && workout.creatorId !== userId){
            const err = new Error("you do not have permission to access this workout");
            err.status = 403;
            return {message: "permission denied", error: err};
        }

        const exercises = await Exercise.findAll({
            include: {
                model: ExerciseInWorkout,
                as: "exercisesInWorkout", 
                where: {
                workout: workoutId,
                },
                attributes: []
            },
            order: [[{ model: ExerciseInWorkout, as: "exercisesInWorkout" }, "order", "ASC"]]
        });
        console.log("gothere")


        return {message: "exercises fetched successfully", exercises: exercises};
    }catch(e){
        console.log(e)
        return {message: "could not get exercises", error: e};
    }
}

async function DeleteFromWorkoutService(workoutId, exerciseId, userId) {
    try{
        const workout = await Workout.findOne({where: {id: workoutId}});
        if (!workout){
            const err = new Error("the workout to remove exercise from does not exist");
            err.status = 404;
            return {message: "workout not found", error: err};
        }
    
        if (workout.creatorId !== userId){
            const err = new Error("you do not have permission to change this workout");
            err.status = 403;
            return {message: "no permission", error: err};
        }

        await ExerciseInWorkout.destroy({
            where: {
                workout: workoutId,
                exercise: exerciseId
            }
        });
        
        return {message: "exercise removed successfully"};
    
    }catch(e){
        return {message: "could not remove exercise from workout"};
    }
}

module.exports = {
    AddExerciseInWorkoutService: AddExerciseInWorkoutService,
    GetForWorkoutService: GetForWorkoutService,
    DeleteFromWorkoutService: DeleteFromWorkoutService
};