import express from "express";

import { ProtectedMiddleware } from "../../middleware/ProtectedMiddleware";
import upload from "../../middleware/imageUploadMiddleware";
import { imageUploadController } from "../../controllers/imageUploadController/imageUploadController";

const router = express.Router();

router.post(
  "/signup",
  ProtectedMiddleware,
  upload.single("image"),
  imageUploadController
);

export default router;
