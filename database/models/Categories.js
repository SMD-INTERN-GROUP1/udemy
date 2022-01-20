const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

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

// Add plugins
category.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });

module.exports = mongoose.model("Categories", category);
