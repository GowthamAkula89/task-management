const Task = require('../models/taskModel');

const createTask = async (data) => {
    const newTask = new Task(data);
    try {
        return await newTask.save();
    } catch (error) {
        if (error.code === 11000) {
            throw new Error('Task title must be unique');
        }
        throw error;
    }
}

const getAllTasks = async () => {
    return await Task.find();
}

const getTaskById = async (id) => {
    return await Task.findById(id);
}

const updateTask = async (id, data) => {
    return await Task.findByIdAndUpdate(id, data, { new: true });

}

const deleteTask = async (id) => {
    return await Task.findByIdAndDelete(id);
}

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
}