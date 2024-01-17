// The job of a controller is to handle requests using the data and logic
// (properties and methods in OOP terms) provided by a Model.
// A controller can have as many handler functions as it requires.

const asyncWrapper = require("../middlewares/async");

const { createCustomError } = require("../errors/custom-error");

// Model
const Task = require("../models/Task");

// Makes a call to `asyncWrapper` passing a function as an argument.
// `asyncWrapper` returns a function. The function gets access to anything
// Express passes to it (req, res etc.) and uses this data with the function
// it received as an argument to do its job.
const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findById({ _id: taskID });
  if (!task) {
    // Create an error and pass it to an error-handling middleware
    // Don't forget that `next()` call the next middleware.
    return next(createCustomError(`No task with id: ${taskID}`, 404));
  }
  res.status(200).json({ task });
});

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(201).json({ tasks });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id: ${taskID}`, 404));
  }
  // res.status(200).json({ task }); // Only to see which task has been removed
  // I'm gonna stick to this approach since I don't really need the task data
  res.status(200).send();
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomError(`No task with id: ${taskID}`, 404));
  }
  res.status(200).json({ task });
});

// By exporting an object you make the interface clear to users of your module.
// In other words, they don't have to scroll through your code to see what is being exported.
module.exports = { createTask, getTask, getAllTasks, updateTask, deleteTask };
