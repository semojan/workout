const express = require("express");
const router = express.Router();
const controller = require("../controllers/Exercise.controller");

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
 * /exercises/addToWorkout:
 *   post:
 *     summary: Add an exercise to a workout.
 *     description: Adds an exercise to a specified workout with details such as duration and order.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               workoutId:
 *                 type: integer
 *                 description: The ID of the workout to which the exercise is to be added.
 *                 example: 8
 *               exerciseId:
 *                 type: integer
 *                 description: The ID of the exercise to be added.
 *                 example: 25
 *               duration:
 *                 type: integer
 *                 description: The duration of the exercise in minutes.
 *                 example: 15
 *               order:
 *                 type: integer
 *                 description: The order in which the exercise appears in the workout.
 *                 example: 4
 *     responses:
 *       200:
 *         description: Exercise added to workout successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Exercise added to workout successfully"
 *       404:
 *         description: Workout or exercise not found.
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
 *       500:
 *         description: Adding exercise failed due to server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "adding exercise failed"
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Internal server error"
 */


router.post("/addToWorkout", controller.AddToWorkout);

module.exports = router;