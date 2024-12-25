const express = require("express");
const controller = require("../controllers/WorkoutPublic.controller");
const router = express.Router();

/**
 * @swagger
 * /workout:
 *   get:
 *     summary: Fetch all workouts.
 *     description: Retrieves a list of all workouts, including details such as name, visibility, total duration, experience, creator information, and timestamps.
 *     responses:
 *       200:
 *         description: Workouts fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "workouts fetched successfully"
 *                 workouts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The unique ID of the workout.
 *                         example: 9
 *                       name:
 *                         type: string
 *                         description: The name of the workout.
 *                         example: "test workout"
 *                       description:
 *                         type: string
 *                         description: A short description of the workout. Can be null.
 *                         example: null
 *                       public:
 *                         type: boolean
 *                         description: Indicates whether the workout is public or private.
 *                         example: true
 *                       totalDuration:
 *                         type: integer
 *                         description: The total duration of the workout in minutes.
 *                         example: 29
 *                       totalExp:
 *                         type: integer
 *                         description: The total experience points associated with the workout.
 *                         example: 7
 *                       creatorId:
 *                         type: integer
 *                         description: The ID of the user who created the workout.
 *                         example: 2
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: The timestamp when the workout was created.
 *                         example: "2024-12-20T11:41:41.887Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: The timestamp when the workout was last updated.
 *                         example: "2024-12-20T11:52:05.678Z"
 *       500:
 *         description: Could not fetch workouts due to server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "could not get workouts"
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Internal server error"
 */


router.get("/", controller.GetAllWorkouts);

module.exports = router;