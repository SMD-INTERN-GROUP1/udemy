const mongoose = require("mongoose");

const chapter = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
    },
    video_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chapter", chapter);
