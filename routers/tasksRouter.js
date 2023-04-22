const express = require("express");
const router = express.Router();

// Controllers
const { createTask, getTask, getAllTasks, updateTask, deleteTask } = require("../controllers/tasksController");

router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;
