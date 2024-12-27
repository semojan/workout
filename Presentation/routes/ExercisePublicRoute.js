const express = require("express");
const router = express.Router();
const controller = require("../controllers/ExercisePublic.controller");

/**
 * @swagger
 * /exercise:
 *   get:
 *     summary: Retrieve a list of exercises
 *     description: Fetch all exercises from the database, with optional filtering by muscle group and category.
 *     parameters:
 *       - in: query
 *         name: muscleGroup
 *         required: false
 *         schema:
 *           type: string
 *           enum:
 *             - chest
 *             - back
 *             - legs
 *             - arms
 *             - shoulders
 *             - core
 *             - cardio
 *         description: Filter exercises by muscle group
 *       - in: query
 *         name: category
 *         required: false
 *         schema:
 *           type: string
 *           enum:
 *             - strength
 *             - cardio
 *             - mobility
 *             - endurance
 *         description: Filter exercises by category
 *     responses:
 *       200:
 *         description: Exercises fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 5
 *                       name:
 *                         type: string
 *                         example: Running
 *                       description:
 *                         type: string
 *                         example: A cardio exercise to improve endurance.
 *                       muscleGroup:
 *                         type: string
 *                         example: cardio
 *                       category:
 *                         type: string
 *                         example: cardio
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-12-18T06:44:45.676Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-12-18T06:44:45.676Z"
 *                 message:
 *                   type: string
 *                   example: Exercises fetched successfully
 *       400:
 *         description: Invalid query parameters
 */

router.get("/", controller.GetAllExercises);


/**
 * @swagger
 * /exercises/getforworkout/{workoutId}:
 *   get:
 *     summary: Fetch exercises for a specific workout.
 *     description: Retrieves all exercises associated with a specific workout, ordered by their sequence in the workout.
 *     parameters:
 *       - in: path
 *         name: workoutId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the workout for which exercises need to be fetched.
 *         example: 1
 *     responses:
 *       200:
 *         description: Exercises fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "exercises fetched successfully"
 *                 exercises:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The unique ID of the exercise.
 *                         example: 3
 *                       name:
 *                         type: string
 *                         description: The name of the exercise.
 *                         example: "Plank"
 *                       description:
 *                         type: string
 *                         description: A brief description of the exercise.
 *                         example: "An isometric core strength exercise."
 *                       muscleGroup:
 *                         type: string
 *                         description: The primary muscle group targeted by the exercise.
 *                         example: "core"
 *                       category:
 *                         type: string
 *                         description: The category of the exercise.
 *                         example: "mobility"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: The timestamp when the exercise was created.
 *                         example: "2024-12-18T06:44:45.676Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: The timestamp when the exercise was last updated.
 *                         example: "2024-12-18T06:44:45.676Z"
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
 *       403:
 *         description: Permission denied to access the workout.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "permission denied"
 *                 error:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: integer
 *                       example: 403
 *                     message:
 *                       type: string
 *                       example: "you do not have permission to access this workout"
 *       500:
 *         description: Could not fetch exercises due to server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "could not get exercises"
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Internal server error"
 */

router.get("/getForWorkout/:workoutId", controller.GetForWorkout);

module.exports = router;