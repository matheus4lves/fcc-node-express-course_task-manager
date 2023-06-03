const Task = require("../models/Task");

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (err) {
    const {
      errors: {
        name: { message },
      },
    } = err;
    res.status(500).json({ error: message });
  }
};
const getTask = (req, res) => res.json({ id: req.params.id });
const getAllTasks = (req, res) => res.send("Get all tasks");
const updateTask = (req, res) => res.json({ id: req.params.id, updated: req.body.updated });
const deleteTask = (req, res) => res.json({ id: req.params.id, deleted: true });

module.exports = { createTask, getTask, getAllTasks, updateTask, deleteTask };
