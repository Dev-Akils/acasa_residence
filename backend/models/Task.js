const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  created_at: { type: Date, required: true, default: Date.now },
  due_date: { type: Date, required: true },
  completed_date: { type: Date },
  remarks: { type: String, required: true },
  status: {
    type: String,
    enum: ["Pending", "Completed"],
    default: "Pending",
  },
});

module.exports = mongoose.model("Task", TaskSchema);
