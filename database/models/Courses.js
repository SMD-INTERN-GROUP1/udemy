const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");

const mongooseDelete = require("mongoose-delete");
mongoose.plugin(slug);

const video = new mongoose.Schema(
  {
    video_url: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    video_position: {
      type: Number,
      unique: true
    }
  }
)

const chapter = new mongoose.Schema(
  {
    title: {
      type: String,
      default: ''
    },
    chapter_position: {
      type: Number,
      unique: true
    },
    list_video: [video]
  }
)

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rate: { type: Number, required: true },
    user: { type: mongoose.Types.ObjectId, ref: "Users", required: true },
  },
  { timestamps: true }
);


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
    list_chapter: [chapter],
    topic_id: {
      type: mongoose.Types.ObjectId,
      ref: "Topic",
    },
    instructor_id: {
      type: mongoose.Types.ObjectId,
      ref: "Instructor",
    },
    reviews: [reviewSchema],
    rating: { type: Number, default: 0 },
    numberReview: { type: Number, default: 0 },
    // kids: [{type:mongoose.Schema.Types.ObjectId}]  
  },
  { timestamps: true }
);


// Add plugin
// mongoose.plugin(slug);
course.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });
module.exports = mongoose.model("Course", course);


