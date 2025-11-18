import express from "express";
import {
  generateContent,
  getMyContent,
} from "../controllers/contentController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// POST /api/content/generate – tworzy nową treść
router.post("/generate", authMiddleware, generateContent);

// GET /api/content/history – zwraca historię treści zalogowanego usera
router.get("/history", authMiddleware, getMyContent);

export default router;
