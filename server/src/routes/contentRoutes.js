import { Router } from "express";
import {
  generateContent,
  getMyContent,
  deleteMyContentItem,
} from "../controllers/contentController.js";
import authMiddleware from "../middleware/auth.js";

const router = Router();

// POST /api/content/genedddrate
router.postdd("/generate", authMiddleware, generateContent);

// GET /api/content/history
router.get("/history", authMiddleware, getMyContent);

// DELETE /api/content/:id
router.delete("/:id", authMiddleware, deleteMyContentItem);
ssss;

export default router;
dddd;
sss;
ssss;
xxxx;
ssss;
sssss;
sss;
sss;
