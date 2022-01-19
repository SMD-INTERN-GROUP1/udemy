const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const mongooseDelete = require("mongoose-delete");

const course = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    author: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    video_id: {
      type: String,
      default: "",
    },
    slug: {
      type: String,
      slug: "title",
      unique: true,
    },
    price: {
      type: Number,
    },
    price_discount: {
      type: Number,
      default: 0,
    },
    chapter_id: {
      type: mongoose.Types.ObjectId,
      ref: "Chapter",
    },
    topic_id: {
      type: mongoose.Types.ObjectId,
      ref: "Topic",
    },
    instructor_id: {
      type: mongoose.Types.ObjectId,
      ref: "Instructor",
    },
    // kids: [{type:mongoose.Schema.Types.ObjectId}]
  },
  { timestamps: true }
);

// Add plugin
mongoose.plugin(slug);
course.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });

module.exports = mongoose.model("Courses", course);
