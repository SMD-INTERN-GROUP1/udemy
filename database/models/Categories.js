const mongoose = require("mongoose");

const category = new mongoose.Schema(
  {
    id_category: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    kids: [{ type: mongoose.Schema.Types.ObjectId }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Categories", category);
