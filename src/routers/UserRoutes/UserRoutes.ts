import express from "express";
import { ProtectedMiddleware } from "../../middleware/ProtectedMiddleware";
import { authorizedRole } from "../../middleware/AuthorizedRoles";
import { getAllUser } from "../../controllers/userContorller/userController";

const router = express.Router();

router.get("/", ProtectedMiddleware, authorizedRole("Admin"), getAllUser);

export default router;
