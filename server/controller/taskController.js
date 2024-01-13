const taskModel = require("../Models/taskModel");

const getAllTasks = async (req, res) => {
  try {
    const allTasks = await taskModel.find({});
    res.status(200).json({ allTasks });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await taskModel.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
const getTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const singleTask = await taskModel.findOne({ _id: taskID });
    if (!singleTask)
      return res.status(404).json({ msg: `No task with this id_: ${taskID}` });
    res.status(200).json({ singleTask });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const updateSingleTask = await taskModel.findOneAndUpdate(
      { _id: taskID },
      req.body
    );
    if (!updateSingleTask)
      return res.status(404).json({ msg: `No task with this id_: ${taskID}` });
    res.status(200).json({ updateSingleTask });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const deleteSingleTask = await taskModel.findOneAndDelete({ _id: taskID });
    if (!deleteSingleTask)
      return res.status(404).json({ msg: `No task with this id_: ${taskID}` });
    res.status(200).json({ deleteSingleTask });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
