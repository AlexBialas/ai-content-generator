import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Routes
import authRoutes from "./routes/authRoutes.js";
import contentRoutes from "./routes/contentRoutes.js"; // <-- DODANE

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Simple healthcheck
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "AI Content Generator API running" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/content", contentRoutes); // <-- DODANE

// Connect to MongoDB
const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ai-content-generator";

const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("⚠️ Could not connect to MongoDB:", err.message);
    console.error("   Backend działa, ale baza jeszcze nie jest podłączona.");
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();
