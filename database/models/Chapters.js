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
      unique: true
    }
  }
);
const chapter = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
    },
    position: {
      type: Number,
      unique: true
    },
    list_video: [video],
    course_id: {
      type: mongoose.Types.ObjectId,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chapter", chapter);
