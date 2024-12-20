const express = require("express");
const controller = require("../controllers/WorkoutPrivate.controller");
const router = express.Router();

router.post("/", controller.AddWorkout);

router.put("/:id", controller.UpdateWorkout);

router.delete("/:id", controller.DeleteWorkout);

router.get("/my", controller.GetUserWorkouts);

module.exports = router;