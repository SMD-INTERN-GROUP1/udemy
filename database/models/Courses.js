const mongoose = require("mongoose");

const course = new mongoose.Schema(
  {
    image: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    author: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      default: 0,
    },
    isDiscount: {
      type: Boolean,
      default: false,
    },
    topic_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
    },
    // kids: [{type:mongoose.Schema.Types.ObjectId}]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Courses", course);
