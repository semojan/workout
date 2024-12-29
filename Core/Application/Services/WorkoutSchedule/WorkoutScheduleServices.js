const { Workout, User, WorkoutSchedule } = require("../../../../Infrastructure/database/db");

const STATUS = ['Scheduled', 'Completed', 'Skipped'];

async function AddScheduleService(userId, workoutId, schedule) {
    try {
        const workout = await Workout.findByPk(workoutId);
        if (!workout) {
            const err = new Error("the workout to add exercise does not exist");
            err.status = 404;
            return { message: "workout not found", error: err };
        }

        const parsedSchedule = new Date(schedule);
        if (isNaN(parsedSchedule)) {
            const err = new Error('Invalid schedule date provided.');
            return { message: "invalid date", error: err };
        }

        const now = new Date();
        if (parsedSchedule <= now) {
            const err = new Error('The schedule time must be in the future.');
            return { message: "invalid date", error: err };
        }

        const existingSchedule = await WorkoutSchedule.findOne({
            where: {
                user: userId,
                workout: workoutId,
                schedule: parsedSchedule,
            },
        });

        if (existingSchedule) {
            const err = new Error('A workout schedule already exists for this user and workout at the specified time.');
            return { message: "duplicated schedule", error: err };
        }

        const newSchedule = await WorkoutSchedule.create({
            user: userId,
            workout: workoutId,
            schedule: parsedSchedule,
        });

        return { message: 'Workout schedule added successfully.', schedule: newSchedule.id };
    } catch (error) {
        console.error('Error in AddScheduleService:', error.message);
        return {
            success: false,
            message: error.message,
        };
    }
}

async function GetUserSchedulesService(userId) {
    try {
        const schedules = await WorkoutSchedule.findAll({ where: { user: userId } });

        if(!schedules){
            return {message: "you have no schedules yet"};
        }

        return {message: "schedules retrieved successfully", data: schedules};
    } catch (e) {
        return { message: e.message, error: e };
    }
}

async function GetScheduleService(scheduleId, userId) { 
    try {
        const schedule = await WorkoutSchedule.findByPk(scheduleId);

        if (!schedule){
            const err = new Error("the schedule does not exist");
            err.status = 404;
            return { message: "schedule not found", error: err };
        }

        if (schedule.user !== userId){
            const err = new Error("you do not have permission to get this schedule");
            err.status = 403;
            return {message: "no permission", error: err};
        }

        return {message: "schedule retrieved successfully", data: schedule};
    } catch (e) {
        return { message: e.message, error: e };
    }
}

async function UpdateScheduleService(scheduleId, status, scheduleTime, userId) { 
    try{
        const schedule = await WorkoutSchedule.findByPk(scheduleId);

        if (!schedule){
            const err = new Error("the schedule does not exist");
            err.status = 404;
            return { message: "schedule not found", error: err };
        }

        if (schedule.user !== userId){
            const err = new Error("you do not have permission to change this schedule");
            err.status = 403;
            return {message: "no permission", error: err};
        }

        if (status && !STATUS.includes(status)) {
            const err = new Error(`Invalid status. Valid values are: ${STATUS.join(', ')}`);
            return { message: `Invalid status.`, error: err };
        }

        if (schedule.status === 'Completed'){
            const err = new Error("you have already completed this workout");
            return {message: "unable to update", error: err};
        }

        if (status === "Completed"){
            const user = await User.findByPk(schedule.user);

            const workout = await Workout.findByPk(schedule.workout);

            user.exp += workout.totalExp;
            await user.save();
        }

        if (scheduleTime) {
            const parsedSchedule = new Date(scheduleTime);
            if (isNaN(parsedSchedule)) {
                const err = new Error('Invalid schedule date provided.');
                return { message: "invalid date", error: err };
            }
            const now = new Date();
            if (parsedSchedule <= now) {
                const err = new Error('The schedule time must be in the future.');
                return { message: "invalid date", error: err };
            }
            schedule.schedule = parsedSchedule;
        }

        if (status) {
            schedule.status = status;
        }

        schedule.save();

        return {message: "schedule updated successfully", data: schedule};
    } catch (e) {
        return { message: e.message, error: e };
    }
}

async function DeleteScheduleService(scheduleId, userId) { 
    try {
        const schedule = await WorkoutSchedule.findByPk(scheduleId);

        if (!schedule) {
            const err = new Error("The schedule does not exist");
            err.status = 404;
            return { message: "schedule not found", error: err };
        }   

        if (schedule.user !== userId) {
            const err = new Error("You do not have permission to remove this schedule");
            err.status = 403;
            return { message: "no permission", error: err };
        }

        if (schedule.status === 'Completed'){
            const user = await User.findByPk(schedule.user);

            const workout = await Workout.findByPk(schedule.workout);

            user.exp -= workout.totalExp;
            await user.save();
        }

        await schedule.destroy();
        return {message: "schedule removed successfully"};
    } catch (e){
        return { message: e.message, error: e };
    }
}

module.exports = {
    AddScheduleService: AddScheduleService,
    GetUserSchedulesService: GetUserSchedulesService,
    GetScheduleService: GetScheduleService,
    UpdateScheduleService: UpdateScheduleService,
    DeleteScheduleService: DeleteScheduleService
};