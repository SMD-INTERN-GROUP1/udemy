const mongoose = require("mongoose");

const instructor = new mongoose.Schema(
  {
    specialty: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    experience: {
      type: String,
      default: "",
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Instructor", instructor);