import Content from "../models/Content.js";

// POST /api/content/generate
export const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || prompt.trim().length === 0) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    // 🔮 FAKE AI – później tu podepniemy prawdziwe AI
    const fakeOutput = `Generated content for: "${prompt}" (this is a placeholder, real AI coming soon)`;

    const newContent = await Content.create({
      user: req.user.id, // ID z middleware auth
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
    const items = await Content.find({ user: req.user.id })
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

// DELETE /api/content/:id
export const deleteMyContentItem = async (req, res) => {
  try {
    const { id } = req.params;

    // Szukamy TYLKO contentu zalogowanego usera
    const item = await Content.findOne({ _id: id, user: req.user.id });

    if (!item) {
      return res.status(404).json({ message: "Content not found" });
    }

    await item.deleteOne();

    res.json({ message: "Content deleted successfully" });
  } catch (err) {
    console.error("Error in deleteMyContentItem:", err.message);
    res.status(500).json({ message: "Server error while deleting content" });
  }
};
