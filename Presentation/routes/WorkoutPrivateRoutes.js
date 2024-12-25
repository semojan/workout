const express = require("express");
const controller = require("../controllers/WorkoutPrivate.controller");
const router = express.Router();

/**
 * @swagger
 * /workout:
 *   post:
 *     summary: Create a new workout.
 *     description: Adds a new workout to the database with details such as name, description, and visibility.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the workout.
 *                 example: "test workout"
 *               description:
 *                 type: string
 *                 description: A short description of the workout.
 *                 example: "hello workout"
 *               public:
 *                 type: boolean
 *                 description: Indicates whether the workout is public or private.
 *                 example: true
 *     responses:
 *       200:
 *         description: Workout created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "new workout was added successfully."
 *                 workoutId:
 *                   type: integer
 *                   description: The ID of the newly created workout.
 *                   example: 12
 *       500:
 *         description: Failed to create workout due to server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "failed to create workout"
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Internal server error"
 */

router.post("/", controller.AddWorkout);


/**
 * @swagger
 * /workout/{id}:
 *   put:
 *     summary: Update an existing workout.
 *     description: Updates the details of a specific workout, such as its name, description, and visibility. Partial updates are allowed, meaning not all attributes need to be included in the request body.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the workout to update.
 *         example: 9
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The updated name of the workout.
 *                 example: "test workout"
 *               description:
 *                 type: string
 *                 description: The updated description of the workout.
 *                 example: "hello workout"
 *               public:
 *                 type: boolean
 *                 description: The updated visibility of the workout (public or private).
 *                 example: true
 *             additionalProperties: false
 *     responses:
 *       200:
 *         description: Workout updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "workout updated successfully"
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
 *                       example: "workout not found"
 *       500:
 *         description: Failed to update workout due to server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "failed to edit workout"
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Internal server error"
 */

router.put("/:id", controller.UpdateWorkout);

router.delete("/:id", controller.DeleteWorkout);

router.get("/my", controller.GetUserWorkouts);

module.exports = router;