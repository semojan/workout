const express = require("express");
const controller = require("../controllers/WorkoutSchedule.controller");
const router = express.Router();

/**
 * @swagger
 * /workout/schedule:
 *   post:
 *     summary: Schedule a workout for a specific date and time.
 *     description: Allows a user to schedule a workout session at a specified date and time. The schedule must be unique for the user and workout at the specified time and must be in the future.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               workout:
 *                 type: integer
 *                 description: The ID of the workout to be scheduled.
 *                 example: 8
 *               schedule:
 *                 type: string
 *                 format: date-time
 *                 description: The date and time to schedule the workout.
 *                 example: "2025-01-20T10:00:00Z"
 *     responses:
 *       200:
 *         description: Workout schedule added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Workout schedule added successfully."
 *                 schedule:
 *                   type: integer
 *                   description: The ID of the created workout schedule.
 *                   example: 12
 *       400:
 *         description: Invalid or duplicate schedule.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "invalid date"
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Invalid schedule date provided."
 *       404:
 *         description: Workout not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "workout not found"
 *                 error:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: integer
 *                       example: 404
 *                     message:
 *                       type: string
 *                       example: "the workout to add exercise does not exist"
 *       409:
 *         description: Duplicate schedule.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "duplicated schedule"
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "A workout schedule already exists for this user and workout at the specified time."
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

router.post("/", controller.AddSchedule);


/**
 * @swagger
 * /workout/schedule/my:
 *   get:
 *     summary: Get all workout schedules for the authenticated user.
 *     description: Retrieves a list of all workout schedules created by the user.
 *     responses:
 *       200:
 *         description: Schedules retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Schedule removed successfully."
 *                     data:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           description: The ID of the schedule.
 *                           example: 1
 *                         status:
 *                           type: string
 *                           description: The current status of the schedule.
 *                           example: "Scheduled"
 *                         schedule:
 *                           type: string
 *                           format: date-time
 *                           description: The scheduled date and time.
 *                           example: "2024-12-30T10:00:00.000Z"
 *                         workout:
 *                           type: integer
 *                           description: The ID of the workout associated with the schedule.
 *                           example: 8
 *                         user:
 *                           type: integer
 *                           description: The ID of the user who created the schedule.
 *                           example: 2
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           description: The timestamp when the schedule was created.
 *                           example: "2024-12-28T06:55:02.503Z"
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *                           description: The timestamp when the schedule was last updated.
 *                           example: "2024-12-28T06:55:02.503Z"
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "you have no schedules yet"
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Error message details"
 */

router.get("/my", controller.GetUserSchedules);


/**
 * @swagger
 * /workout/schedule/{id}:
 *   get:
 *     summary: Get details of a specific workout schedule.
 *     description: Retrieve the details of a workout schedule by its ID for the authenticated user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the workout schedule.
 *         schema:
 *           type: integer
 *           example: 2
 *     responses:
 *       200:
 *         description: Schedule retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "schedule retrieved successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The ID of the schedule.
 *                       example: 2
 *                     status:
 *                       type: string
 *                       description: The current status of the schedule.
 *                       example: "Scheduled"
 *                     schedule:
 *                       type: string
 *                       format: date-time
 *                       description: The scheduled date and time.
 *                       example: "2024-12-29T10:00:00.000Z"
 *                     workout:
 *                       type: integer
 *                       description: The ID of the workout associated with the schedule.
 *                       example: 8
 *                     user:
 *                       type: integer
 *                       description: The ID of the user who created the schedule.
 *                       example: 2
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: The timestamp when the schedule was created.
 *                       example: "2024-12-28T06:55:41.634Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: The timestamp when the schedule was last updated.
 *                       example: "2024-12-28T06:55:41.634Z"
 *       404:
 *         description: Schedule not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "schedule not found"
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "the schedule does not exist"
 *       403:
 *         description: User does not have permission to access this schedule.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "no permission"
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "you do not have permission to get this schedule"
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Error message details"
 */

router.get("/:id", controller.GetSchedule);


/**
 * @swagger
 * /workout/schedule/{id}:
 *   put:
 *     summary: Update a workout schedule.
 *     description: Modify the status or schedule date of an existing workout schedule by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the workout schedule.
 *         schema:
 *           type: integer
 *           example: 2
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: The status of the schedule. Valid values are 'Scheduled', 'Completed', or 'Skipped'.
 *                 example: "Skipped"
 *               schedule:
 *                 type: string
 *                 format: date-time
 *                 description: The new date and time for the schedule.
 *                 example: "2024-12-30T10:00:00Z"
 *     responses:
 *       200:
 *         description: Schedule updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "schedule updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The ID of the schedule.
 *                       example: 2
 *                     status:
 *                       type: string
 *                       description: The updated status of the schedule.
 *                       example: "Skipped"
 *                     schedule:
 *                       type: string
 *                       format: date-time
 *                       description: The updated schedule time.
 *                       example: "2024-12-30T10:00:00Z"
 *                     workout:
 *                       type: integer
 *                       description: The ID of the associated workout.
 *                       example: 8
 *                     user:
 *                       type: integer
 *                       description: The ID of the user.
 *                       example: 2
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: When the schedule was created.
 *                       example: "2024-12-28T06:55:41.634Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: When the schedule was last updated.
 *                       example: "2024-12-30T10:01:15.234Z"
 *       404:
 *         description: Schedule not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "schedule not found"
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "the schedule does not exist"
 *       403:
 *         description: User does not have permission to modify this schedule.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "no permission"
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "you do not have permission to change this schedule"
 *       400:
 *         description: Invalid input data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid status."
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Invalid status. Valid values are: Scheduled, Completed, Skipped"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Error message details"
 */

router.put("/:id", controller.UpdateSchedule);


/**
 * @swagger
 * /workout/schedule/{id}:
 *   delete:
 *     summary: Delete a specific workout schedule
 *     description: Removes the workout schedule identified by the given ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the schedule to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Schedule removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Schedule removed successfully
 *       403:
 *         description: Forbidden - You do not have permission to remove this schedule
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: You do not have permission to remove this schedule
 *       404:
 *         description: Not Found - The schedule does not exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: The schedule does not exist
 *       500:
 *         description: Internal Server Error - An error occurred while processing the request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred while processing the request
 */

router.delete("/:id", controller.DeleteSchedule);

module.exports = router