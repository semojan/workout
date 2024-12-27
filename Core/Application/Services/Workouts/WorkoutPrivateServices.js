const { where } = require("sequelize");
const {Workout} = require("../../../../Infrastructure/database/db");


async function AddWorkoutService(data, userId){
    try{
        const workout = await Workout.create({
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
        const workout = await Workout.findByPk(workoutId);
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

async function DeleteWorkoutService(workoutId, userId){
    try{
        const workout = await Workout.findByPk(workoutId);
        if(!workout){
            const error = new Error("workout not found");
            error.status = 404;
            return {message: "workout not found", error: error};
        }

        if(workout.creatorId !== userId){
            const error = new Error("you do not have permission to delete this workout");
            error.status = 403;
            return {message: "no permission to remove workout", error: error};
        }

        await Workouts.destroy({ where: { id: workoutId } });

        return {message: "workout removed successfully"};
    }catch(e){
        return {message: "could not remove workout"};
    }
}

async function GetUserWorkoutsService(userId){
    try{
        const workouts = await Workout.findAll({where: {creatorId: userId}});

        return {message: "user workouts fetched successfully", workouts: workouts};
    }catch(e){
        return {message: "could not get your workouts"};
    }
}

module.exports = {
    AddWorkoutService: AddWorkoutService,
    UpdateWorkoutService: UpdateWorkoutService,
    DeleteWorkoutService: DeleteWorkoutService,
    GetUserWorkoutsService: GetUserWorkoutsService
};