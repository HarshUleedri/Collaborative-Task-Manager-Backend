import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  assignedTo: { type: String, required: true },
  status: {
    type: String,
    enum: ["TO DO", "In Progress", "Done"],
    default: "TO DO",
  },
  assignedToUserId: { type: mongoose.Schema.ObjectId, ref: "User" },
  createdBy: { type: mongoose.Schema.ObjectId, ref: "User" },
});

const Task = mongoose.model("Task", TaskSchema);

export default Task;
