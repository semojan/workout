const services = require("../../Core/Application/Services/WorkoutSchedule/WorkoutScheduleServices");

async function AddSchedule(req, res, next) {
    const userId = req.user.userId;
    const { workout, schedule } = req.body;

    const result = await services.AddScheduleService(userId, workout, schedule);

    res.json(result);
}

async function GetUserSchedules(req, res, next) {
    const userId = req.user.userId;

    const result = await services.GetUserSchedulesService(userId);

    res.json(result);
}

async function GetSchedule(req, res, next) {
    const scheduleId = req.params.id;
    const userId = req.user.userId;

    const result = await services.GetScheduleService(scheduleId, userId);

    res.json(result);
}

async function UpdateSchedule(req, res, next) {
    const scheduleId = req.params.id;
    const { status, schedule } = req.body;

    const result = await services.UpdateScheduleService(scheduleId, status, schedule);

    res.json(result);
}

async function DeleteSchedule(req, res, next) { 
    const scheduleId = req.params.id;

    const result = await services.DeleteScheduleService(scheduleId);

    res.json(result);
}

module.exports = {
    AddSchedule: AddSchedule,
    GetUserSchedules: GetUserSchedules,
    GetSchedule: GetSchedule,
    UpdateSchedule: UpdateSchedule,
    DeleteSchedule: DeleteSchedule
};