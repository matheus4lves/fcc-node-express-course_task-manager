const express = require("express");
const router = express.Router();

// Controllers. The job of a controller is to handle the request using the data and logic
// (properties and methods in OOP terms) provided by a model.
const { createTask, getTask, getAllTasks, updateTask, deleteTask } = require("../controllers/tasksController");

router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;
