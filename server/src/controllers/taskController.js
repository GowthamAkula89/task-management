const taskService = require('../services/taskService')
const createTask = async (req, res) => {
    try {
        const task = await taskService.createTask(req.body);
        res.status(201).json(task);
    } catch (error) {
        if (error.message === 'Task title must be unique') {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
}

const getAllTasks = async (req, res) => {
    try{
        const tasks = await taskService.getAllTasks();
        res.json(tasks);
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getTaskById = async (req, res) => {
    const {id} = req.params;
    try{
        const task = await taskService.getTaskById(id);
        if(!task){
            return res.status(404).json({message: 'Task not found'});
        }
        res.json(task);
    }catch (error){
        res.status(500).json({message : error.message});
    }
    
}

const updateTask = async (req, res) => {
    const {id} = req.params;
    const data = req.body;
    try{
        const updatedTask = await taskService.updateTask(id, data);
        if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
        res.json(updatedTask);
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteTask = async (req, res) => {
    const {id} = req.params;
    try {
        const deletedTask = await taskService.deleteTask(id);
        if (!deletedTask) return res.status(404).json({ message: 'Task not found' });
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
}