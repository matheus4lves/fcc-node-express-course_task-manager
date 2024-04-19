"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// The job of a router is to route requests to the appropriate controller
const router = express_1.default.Router();
// Controller
const tasksController_cjs_1 = require("../controllers/tasksController.cjs");
router.route("/").get(tasksController_cjs_1.getAllTasks).post(tasksController_cjs_1.createTask);
router.route("/:id").get(tasksController_cjs_1.getTask).patch(tasksController_cjs_1.updateTask).delete(tasksController_cjs_1.deleteTask);
exports.default = router;
