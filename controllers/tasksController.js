const Task = require("../models/tasksModel");

// Define controllers
const getTasks = async (_req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks)
    } catch(error) {
        res.status(500).json( {error: "Server error!" } )
    }
};

const addTask = async (req, res) => {
    const { title, description } = req.body.data;
    try {
        const newTask = new Task({ title, description })
        await newTask.save();
        res.status(201).json(newTask)
    } catch (error) {
        res.status(500).json( {error: "Server Error"} )
    }
}

const deleteTask = async (req, res) => {
    const { id } = req.body;
    try {
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(deletedTask);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

module.exports = { getTasks, addTask, deleteTask }