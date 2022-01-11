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
    start: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      default: 0,
    },
    isDiscount: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      default: "",
    },
    _id_topic: [{ type: mongoose.Schema.Types.ObjectId, ref: "Topics" }],
    // kids: [{type:mongoose.Schema.Types.ObjectId}]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Courses", course);
