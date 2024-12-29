const express = require("express");
const router = express.Router();
const controller = require("../controllers/Comment.controller");

/**
 * @swagger
 * /comments/{workoutId}:
 *   get:
 *     summary: Retrieve comments for a specific workout
 *     description: Fetches all comments associated with the specified workout ID.
 *     parameters:
 *       - in: path
 *         name: workoutId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the workout to retrieve comments for.
 *     responses:
 *       200:
 *         description: Comments retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Comments retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The comment ID.
 *                         example: 1
 *                       title:
 *                         type: string
 *                         description: The title of the comment.
 *                         example: "Great workout"
 *                       text:
 *                         type: string
 *                         description: The content of the comment.
 *                         example: "I really enjoyed this session."
 *                       user:
 *                         type: integer
 *                         description: The ID of the user who made the comment.
 *                         example: 2
 *                       workout:
 *                         type: integer
 *                         description: The ID of the workout.
 *                         example: 5
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: The timestamp when the comment was created.
 *                         example: "2024-12-28T06:55:02.503Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: The timestamp when the comment was last updated.
 *                         example: "2024-12-28T06:55:02.503Z"
 *       404:
 *         description: No comments found for the specified workout.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Comments not found"
 *       500:
 *         description: Server error while retrieving comments.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred."
 */


router.get("/:workoutId", controller.GetComments);

/**
 * @swagger
 * /comments/{workoutId}:
 *   post:
 *     summary: Add a new comment to a workout
 *     description: Creates a new comment for the specified workout ID.
 *     parameters:
 *       - in: path
 *         name: workoutId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the workout to add a comment to.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the comment.
 *                 example: "Nice workout"
 *               text:
 *                 type: string
 *                 description: The content of the comment.
 *                 example: "Really enjoyed it"
 *     responses:
 *       201:
 *         description: Comment added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Comment added successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The comment ID.
 *                       example: 1
 *                     title:
 *                       type: string
 *                       description: The title of the comment.
 *                       example: "Nice workout"
 *                     text:
 *                       type: string
 *                       description: The content of the comment.
 *                       example: "Really enjoyed it"
 *                     user:
 *                       type: integer
 *                       description: The ID of the user who made the comment.
 *                       example: 2
 *                     workout:
 *                       type: integer
 *                       description: The ID of the workout.
 *                       example: 5
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: The timestamp when the comment was created.
 *                       example: "2024-12-28T06:55:02.503Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: The timestamp when the comment was last updated.
 *                       example: "2024-12-28T06:55:02.503Z"
 *       404:
 *         description: Workout not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Workout not found"
 *       500:
 *         description: Server error while adding comment.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred."
 */

router.post("/:workoutId", controller.AddComment);


/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Delete a comment
 *     description: Deletes a comment by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the comment to delete.
 *     responses:
 *       200:
 *         description: Comment deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Comment removed successfully"
 *       403:
 *         description: Permission denied to delete the comment.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Permission denied"
 *       404:
 *         description: Comment not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Comment not found"
 *       500:
 *         description: Server error while deleting comment.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

router.delete("/:id", controller.DeleteComment);

module.exports = router;
