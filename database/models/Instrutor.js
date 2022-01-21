const mongoose = require("mongoose");

const social = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },
    url: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

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
    },
    course_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Courses",
      },
    ],
    list_social: [social],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Instructor", instructor);
