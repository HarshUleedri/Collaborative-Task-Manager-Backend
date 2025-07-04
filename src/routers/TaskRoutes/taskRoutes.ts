import express from "express";
import {
  createTask,
  deleteTask,
  getAllTask,
  getSingleTask,
  getUserRelatedTask,
  updateStatus,
} from "../../controllers/taskControllers/taskControllers";
import { ProtectedMiddleware } from "../../middleware/ProtectedMiddleware";
import { authorizedRole } from "../../middleware/AuthorizedRoles";

const router = express.Router();

router.post("/create", ProtectedMiddleware, createTask);
router.put(
  "/:id",
  ProtectedMiddleware,
  authorizedRole("Admin", "Manager"),
  updateStatus
);
router.get("/single/:id", ProtectedMiddleware, getSingleTask);
router.delete("/:id", ProtectedMiddleware, deleteTask);
router.get("/all", ProtectedMiddleware, getAllTask);
router.get("/", ProtectedMiddleware, getUserRelatedTask);

export default router;
