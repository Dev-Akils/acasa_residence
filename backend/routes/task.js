const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

function getTaskStatus(task) {
  const { completed_date, due_date } = task;

  if (!completed_date) return "Pending";

  const completed = new Date(completed_date);
  const due = new Date(due_date);

  if (completed.getTime() === due.getTime()) {
    return "Completed";
  } else if (completed < due) {
    return "Completed_Early";
  } else {
    return "Completed_Late";
  }
}


router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();

    const updatedTasks = tasks.map((task) => {
      const status = getTaskStatus(task);
      return { ...task._doc, status };
    });

    res.json(updatedTasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});


router.post("/", async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.json(task);
});

router.put("/:id", async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTask);
});

router.delete("/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

module.exports = router;
