const mongoose = require("mongoose");

const category = new mongoose.Schema(
  {
    category: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Categories", category);
