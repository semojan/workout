const express = require("express");
const router = express.Router();
const controller = require("../controllers/Exercise.controller");


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
 *       403:
 *         description: no permission to change workout
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
 *                     status:
 *                       type: integer
 *                       example: 403
 *                     message:
 *                       type: string
 *                       example: "you do not have permission to change this workout"
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


/**
 * @swagger
 * /exercises/{workoutId}/{exerciseId}:
 *   delete:
 *     summary: Remove an exercise from a specific workout.
 *     description: Deletes an association between an exercise and a workout, provided the workout exists and the user has permission to modify it.
 *     parameters:
 *       - in: path
 *         name: workoutId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the workout to remove the exercise from.
 *         example: 1
 *       - in: path
 *         name: exerciseId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the exercise to be removed from the workout.
 *         example: 5
 *     responses:
 *       200:
 *         description: Exercise removed successfully from the workout.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "exercise removed successfully"
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
 *                       example: "the workout to remove exercise from does not exist"
 *       403:
 *         description: Permission denied to modify the workout.
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
 *                     status:
 *                       type: integer
 *                       example: 403
 *                     message:
 *                       type: string
 *                       example: "you do not have permission to change this workout"
 *       500:
 *         description: Could not remove the exercise due to server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "could not remove exercise from workout"
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Internal server error"
 */

router.delete("/:workoutId/:exerciseId", controller.DeleteFromWorkout);

module.exports = router;