const express = require("express");
// The job of a router is to route requests to the appropriate controller
const router = express.Router();

// Controller
const { createTask, getTask, getAllTasks, updateTask, deleteTask } = require("../controllers/tasksController");

router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;
