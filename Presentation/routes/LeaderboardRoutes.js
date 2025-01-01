const express = require("express");
const router = express.Router();

const controller = require("../controllers/Leaderboard.controller");

// Swagger Specification for Leaderboard Routes
/**
 * @swagger
 * tags:
 *   name: Leaderboard
 *   description: Leaderboard management endpoints
 */


/**
 * @swagger
 * /leaderboard/top/{count}:
 *   get:
 *     summary: Retrieve the top users from the leaderboard
 *     tags: [Leaderboard]
 *     parameters:
 *       - in: path
 *         name: count
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: The number of top users to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved leaderboard
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: leaderboard retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       userId:
 *                         type: string
 *                         example: "4"
 *                       username:
 *                         type: string
 *                         example: usernewer
 *                       score:
 *                         type: number
 *                         example: 255
 *       400:
 *         description: Invalid count parameter
 *       500:
 *         description: Internal server error
 */

router.get("/top/:count", controller.GetTopUsers);


/**
 * @swagger
 * /leaderboard/user/{id}:
 *   get:
 *     summary: Retrieve rank and score of a specific user by ID
 *     tags: [Leaderboard]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved user rank
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: user data retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       example: "4"
 *                     username:
 *                       type: string
 *                       example: null
 *                     rank:
 *                       type: integer
 *                       example: 1
 *                     score:
 *                       type: number
 *                       example: 255
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

router.get("/user/:id", controller.GetUserRank);


/**
 * @swagger
 * /leaderboard/user:
 *   get:
 *     summary: Retrieve the rank and score of the current user
 *     tags: [Leaderboard]
 *     responses:
 *       200:
 *         description: Successfully retrieved current user rank
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: user data retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       example: "4"
 *                     username:
 *                       type: string
 *                       example: null
 *                     rank:
 *                       type: integer
 *                       example: 1
 *                     score:
 *                       type: number
 *                       example: 255
 *       401:
 *         description: Unauthorized user
 *       500:
 *         description: Internal server error
 */


router.get("/user", controller.GetCurrentUserRank);

module.exports = router;