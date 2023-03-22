const Task = require('../models/task.model');

const createTask = async (req, res, next) => {
  try {
    const payload = req.body;
    const { title, description, isCompleted } = payload;
    const task = await Task.create(payload);
  
    res.status(201).json({
      message: 'Task was successfully added',
      data: task 
    });
  } catch (error) {
    next(error);
  }
};

const getAllTasks = async (req, res, next) => {
  try {
    const task = await Task.find().where({isDeleted: false});
    if (task.length < 1) {
      throw {name: "NOT_FOUND"};
    } 

    res.status(200).json({
      message: 'All tasks successfully retrieved.',
      data: task 
    });
  } catch (error) {
    next(error);
  }
};

const getTaskById = async (req, res, next) => {
  const payload = req.params.taskId;
  try {
    const task = await Task.findById(payload).where({isDeleted: false});
    if (!task) {
      throw {name: 'NOT_FOUND'};
    } 

    res.status(200).json({
      message: 'Task details successfully retrieved.',
      data: task 
    });
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  const { taskId } = req.params;
  const payloadBody = req.body;
  const { title, description, isCompleted } = payloadBody;

  for (const key in payloadBody) {
    if (!payloadBody[key]) {
      delete payloadBody[key];
    }
  }

  try {
    const existingTask = await Task.findOne({ _id: taskId, isDeleted: false });
    if (!existingTask) {
      throw {name: 'NOT_FOUND'};
    }

    await Task.updateOne({ _id: taskId }, payloadBody);

    res.status(200).json({
      message: 'Task was successfully updated',
    });    
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  const { taskId } = req.params;
 
  try {
    const existingTask = await Task.findOne({ _id: taskId, isDeleted: false });
    if (!existingTask) {
      throw {name: 'NOT_FOUND'};
    }

    await Task.updateOne({ _id: taskId }, { isDeleted: true});

    res.status(200).json({
      message: 'Task was successfully deleted',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
