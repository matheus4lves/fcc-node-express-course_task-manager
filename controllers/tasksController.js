const Task = require("../models/Task");

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getTask = (req, res) => res.json({ id: req.params.id });

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(201).json({ tasks });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updateTask = (req, res) => res.json({ id: req.params.id, updated: req.body.updated });
const deleteTask = (req, res) => res.json({ id: req.params.id, deleted: true });

module.exports = { createTask, getTask, getAllTasks, updateTask, deleteTask };
