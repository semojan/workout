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


/**
 * @swagger
 * /workout/{id}:
 *   delete:
 *     summary: Delete an existing workout.
 *     description: Deletes a specific workout if it exists and the requesting user has the necessary permissions.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the workout to delete.
 *         example: 11
 *     responses:
 *       200:
 *         description: Workout deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "workout removed successfully"
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
 *       403:
 *         description: Permission denied to delete the workout.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "no permission to remove workout"
 *                 error:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: integer
 *                       example: 403
 *                     message:
 *                       type: string
 *                       example: "you do not have permission to delete this workout"
 *       500:
 *         description: Could not remove the workout due to server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "could not remove workout"
 */

router.delete("/:id", controller.DeleteWorkout);


/**
 * @swagger
 * /workout/my:
 *   get:
 *     summary: Fetch workouts created by the logged-in user.
 *     description: Retrieves a list of all workouts created by the currently authenticated user, including private and public workouts.
 *     responses:
 *       200:
 *         description: User workouts fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "user workouts fetched successfully"
 *                 workouts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The unique ID of the workout.
 *                         example: 8
 *                       name:
 *                         type: string
 *                         description: The name of the workout.
 *                         example: "test workout"
 *                       description:
 *                         type: string
 *                         description: A short description of the workout. Can be null.
 *                         example: "hello workout"
 *                       public:
 *                         type: boolean
 *                         description: Indicates whether the workout is public or private.
 *                         example: true
 *                       totalDuration:
 *                         type: integer
 *                         description: The total duration of the workout in minutes.
 *                         example: 183
 *                       totalExp:
 *                         type: integer
 *                         description: The total experience points associated with the workout.
 *                         example: 46
 *                       creatorId:
 *                         type: integer
 *                         description: The ID of the user who created the workout.
 *                         example: 2
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: The timestamp when the workout was created.
 *                         example: "2024-12-20T11:32:51.574Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: The timestamp when the workout was last updated.
 *                         example: "2024-12-25T18:16:32.973Z"
 *       500:
 *         description: Could not fetch user workouts due to server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "could not fetch user workouts"
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Internal server error"
 */

router.get("/my", controller.GetUserWorkouts);

module.exports = router;