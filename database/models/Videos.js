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
    video_position: {
      type: Number,
      unique: true
    },
    chapter_id: {
      type: mongoose.Types.ObjectId
    }
  },
  { timestamps: true }
);


module.exports = mongoose.model("Video", video);
