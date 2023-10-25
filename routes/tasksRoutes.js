const express = require('express');
const router = express.Router();

// Destructure methods from controller
const { getTasks, addTask, deleteTask } = require("../controllers/tasksController");

// List all tasks
router.get("/list", getTasks);
router.post("/addTask", addTask);
router.delete("/deleteTask", deleteTask)

module.exports = router;