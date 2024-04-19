"use strict";
// The job of a controller is to handle requests using the data and logic
// (properties and methods in OOP terms) provided by a Model.
// A controller can have as many handler functions as it requires.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const async_cjs_1 = __importDefault(require("../middlewares/async.cjs"));
const custom_error_cjs_1 = require("../errors/custom-error.cjs");
// Model
const Task_cjs_1 = __importDefault(require("../models/Task.cjs"));
// Makes a call to `asyncWrapper` passing a function as an argument.
// `asyncWrapper` returns a function. The function gets access to anything
// Express passes to it (req, res etc.) and uses this data with the function
// it received as an argument to do its job.
const createTask = (0, async_cjs_1.default)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield Task_cjs_1.default.create(req.body);
    res.status(201).json({ task });
}));
const getTask = (0, async_cjs_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: taskID } = req.params;
    const task = yield Task_cjs_1.default.findById({ _id: taskID });
    if (!task) {
        // Create an error and pass it to an error-handling middleware
        // Don't forget that `next()` call the next middleware.
        return next((0, custom_error_cjs_1.createCustomError)(`No task with id: ${taskID}`, 404));
    }
    res.status(200).json({ task });
}));
const getAllTasks = (0, async_cjs_1.default)((_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield Task_cjs_1.default.find({});
    res.status(201).json({ tasks });
}));
const deleteTask = (0, async_cjs_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: taskID } = req.params;
    const task = yield Task_cjs_1.default.findOneAndDelete({ _id: taskID });
    if (!task) {
        return next((0, custom_error_cjs_1.createCustomError)(`No task with id: ${taskID}`, 404));
    }
    // res.status(200).json({ task }); // Only to see which task has been removed
    // I'm gonna stick to this approach since I don't really need the task data
    res.status(200).send();
}));
const updateTask = (0, async_cjs_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: taskID } = req.params;
    const task = yield Task_cjs_1.default.findOneAndUpdate({ _id: taskID }, req.body, {
        new: true,
        runValidators: true,
    });
    if (!task) {
        return next((0, custom_error_cjs_1.createCustomError)(`No task with id: ${taskID}`, 404));
    }
    res.status(200).json({ task });
}));
// By exporting an object you make the interface clear to users of your module.
// In other words, they don't have to scroll through your code to see what is being exported.
module.exports = { createTask, getTask, getAllTasks, updateTask, deleteTask };
