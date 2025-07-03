import express from "express";
import {
  createTask,
  deleteTask,
  getAllTask,
  getUserRelatedTask,
  updateStatus,
} from "../../controllers/taskControllers/taskControllers";

const router = express.Router();

router.post("/create", createTask);
router.put("/:id", updateStatus);
router.delete("/:id", deleteTask);
router.get("/all", getAllTask);
router.get("/", getUserRelatedTask);

export default router;
