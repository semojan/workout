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

router.post("/addToWorkout", controller.AddToWorkout);

module.exports = router;