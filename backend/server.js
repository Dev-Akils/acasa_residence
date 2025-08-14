const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;
const MONGO_URL = "mongodb://localhost:27017/taskdb"; 

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/tasks", require("./routes/task"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
