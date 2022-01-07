const mongoose = require("mongoose");

const category = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
    },
    kids: [{ type: mongoose.Schema.Types.ObjectId }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Categories", category);
