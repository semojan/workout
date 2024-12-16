const express = require("express");
const router = express.Router();
const controller = require("../controllers/Auth.controller");


/**
 * @swagger
 * /signup:
 *   post:
 *     summary: User signup
 *     description: create user with email, name, username, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@email.com
 *               name: 
 *                 type: string
 *                 example: Alice Bob
 *               username: 
 *                 type: string
 *                 example: user123
 *               password:
 *                 type: string
 *                 example: password123
 *               confirmPassword:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: signup successful
 *       401:
 *         description: Invalid credentials
 */

router.post("/signup", controller.signup);


/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Authenticate user with email and password or username and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */

router.post("/login", controller.login);

module.exports = router;