import express from "express";
// The job of a router is to route requests to the appropriate controller
const router = express.Router();

// Controller
import { createTask, getTask, getAllTasks, updateTask, deleteTask } from "../controllers/tasksController.cjs";

router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

export default router;
