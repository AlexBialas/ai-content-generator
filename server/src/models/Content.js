// src/models/Content.js
import mongoose from "mongoose";

const contentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    prompt: {
      type: String,
      required: true,
      trim: true,
    },
    output: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      default: "fake-ai-v1", // później np. "gpt-4.1-mini" itd.
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

const Content = mongoose.model("Content", contentSchema);

export default Content;
