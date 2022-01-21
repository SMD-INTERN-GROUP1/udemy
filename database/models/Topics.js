const mongoose = require("mongoose");

//const mongooseDelete = require("mongoose-delete");
const topic = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
    },
  },
  { timestamps: true }
);

// Add plugins

//topic.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });

module.exports = mongoose.model("Topic", topic);

