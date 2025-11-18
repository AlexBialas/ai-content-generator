// src/controllers/contentController.js
import Content from "../models/Content.js";

// POST /api/content/generate
export const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || prompt.trim().length === 0) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    // 🔮 FAKE AI – później podepniemy prawdziwe AI (OpenAI / cokolwiek)
    const fakeOutput = `Generated content for: "${prompt}" (this is a placeholder, real AI coming soon)`;

    const newContent = await Content.create({
      user: req.user._id, // ustawiane przez middleware auth
      prompt,
      output: fakeOutput,
      model: "fake-ai-v1",
    });

    res.status(201).json(newContent);
  } catch (err) {
    console.error("Error in generateContent:", err.message);
    res.status(500).json({ message: "Server error while generating content" });
  }
};

// GET /api/content/history
export const getMyContent = async (req, res) => {
  try {
    const items = await Content.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50);

    res.json(items);
  } catch (err) {
    console.error("Error in getMyContent:", err.message);
    res
      .status(500)
      .json({ message: "Server error while fetching content history" });
  }
};

// GET /api/content/:id
export const getContentById = async (req, res) => {
  try {
    const item = await Content.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!item) {
      return res.status(404).json({ message: "Content not found" });
    }

    res.json(item);
  } catch (err) {
    console.error("Error in getContentById:", err.message);
    res
      .status(500)
      .json({ message: "Server error while fetching single content item" });
  }
};

// DELETE /api/content/:id
export const deleteContent = async (req, res) => {
  try {
    const removed = await Content.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!removed) {
      return res.status(404).json({ message: "Content not found" });
    }

    res.json({ message: "Content deleted successfully" });
  } catch (err) {
    console.error("Error in deleteContent:", err.message);
    res
      .status(500)
      .json({ message: "Server error while deleting content item" });
  }
};
