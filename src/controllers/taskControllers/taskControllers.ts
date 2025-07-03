import { Request, Response } from "express";
import Task from "../../model/TaskSchema";
import User from "../../model/UserSchema";

export const getAllTask = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const tasks = await Task.find();

    res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.log("Error at delete task", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getUserRelatedTask = (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const tasks = Task.find({ assignedToUserId: user._id });
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.log("Error at get user Related Task", error);
    res.status(500).json({ message: "Internal Server Error " });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, assignedTo } = req.body;
    const user = req.user;
    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (!title || !description || !assignedTo) {
      res.status(400).json({ message: "required all fields" });
      return;
    }

    if (user?.role === "Member") {
      res.status(403).json({ message: "Forbidden: Access denied" });
      return;
    }

    const Assignee = await User.findOne({ assignedTo });

    if (!Assignee) {
      res.status(404).json({ message: " Assignee in Not Found" });
      return;
    }

    const task = await Task.create({
      title,
      description,
      assignedTo,
      assignedToUserId: Assignee._id,
      createdBy: user?._id,
    });

    res.status(201).json({ success: true, task });
  } catch (error) {
    console.log("Error at create Task", error);
    res.status(500).json({ message: "Internal Server Error " });
  }
};

export const updateStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const user = req.user;
    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (!id) {
      res.status(400).json({ message: "Bad Request Id is Required" });
      return;
    }
    if (!status) {
      res.status(400).json({ message: "Bad Request Status is Required" });
      return;
    }
    const updateTask = await Task.findByIdAndUpdate(id, { status });

    res.status(200).json({ success: true, updateTask });
  } catch (error) {
    console.log("Error at Update status", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = req.user;
    if (!id) {
      res.status(400).json({ message: "Bad Request Id is Required" });
      return;
    }
    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (user.role === "Member") {
      res.status(403).json({ message: "Forbidden: Access denied" });
      return;
    }

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deleteTask) {
      res.status(404).json({ message: "Task is Not Found" });
      return;
    }

    res.status(200).json({ success: true, deletedTask });
  } catch (error) {
    console.log("Error at delete task", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
