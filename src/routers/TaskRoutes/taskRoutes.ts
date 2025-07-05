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

router.post(
  "/create",
  ProtectedMiddleware,
  authorizedRole("Admin", "Manager"),
  createTask
);
router.put(
  "/:id",
  ProtectedMiddleware,
  authorizedRole("Admin", "Manager"),
  updateStatus
);
router.get(
  "/single/:id",
  ProtectedMiddleware,
  authorizedRole("Admin", "Manager"),
  getSingleTask
);
router.delete("/:id", ProtectedMiddleware, authorizedRole("Admin"), deleteTask);
router.get(
  "/all",
  ProtectedMiddleware,
  authorizedRole("Admin", "Manager"),
  getAllTask
);
router.get("/", ProtectedMiddleware, getUserRelatedTask);

export default router;
