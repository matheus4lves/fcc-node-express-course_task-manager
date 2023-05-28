const createTask = (req, res) => res.json(req.body);
const getTask = (req, res) => res.json({ id: req.params.id });
const getAllTasks = (req, res) => res.send("Get all tasks");
const updateTask = (req, res) => res.json({ id: req.params.id, updated: req.body.updated });
const deleteTask = (req, res) => res.json({ id: req.params.id, deleted: true });

module.exports = { createTask, getTask, getAllTasks, updateTask, deleteTask };
