const ExerciseInWorkout = require("../../../Domain/Entities/ExerciseInWorkout");
const Workout = require("../../../Domain/Entities/Workout");
const Exercise = require("../../../Domain/Entities/Exercise");

async function AddExerciseInWorkoutService(workoutId, exerciseId, duration, order){
    const workout = await Workout.findOne({where: {id: workoutId}});
    if (!workout){
        const err = new Error("the workout to add exercise does not exist");
        err.status = 404;
        return {message: "workout not found", error: err};
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
        console.log(workout.totalDuration, workout.totalExp)

        await workout.save();
        return { message: "Exercise added to workout successfully" };
    }catch(e){
        return {message: "adding exercise failed", error: e};
    }
}

module.exports = {
    AddExerciseInWorkoutService: AddExerciseInWorkoutService
};