import express from "express";

import { ProtectedMiddleware } from "../../middleware/ProtectedMiddleware";
import upload from "../../middleware/imageUploadMiddleware";
import { imageUploadController } from "../../controllers/imageUploadController/imageUploadController";

const router = express.Router();

router.post(
  "/image",
  ProtectedMiddleware,
  upload.single("image"),
  imageUploadController
);

export default router;
