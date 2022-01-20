const mongoose = require("mongoose");

const video = new mongoose.Schema(
  {
    video_url: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    position: {
      type: Number,
    },
    // kids: [{ type: mongoose.Schema.Types.ObjectId }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Video", video);
