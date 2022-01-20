const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);

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
    image: {
      type: String,
      default: "",
    },
    video_id: {
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
    price: {
      type: Number,
      default: 0,
    },
    slug: {
      type: String,
      slug: "title",
      unique: true,
    },
    price_discount: {
      type: Number,
      default: false,
    },
    chapter_id: {
      type: mongoose.Types.ObjectId,
      ref: "Chapter",
    },
    topic_id: {
      type: mongoose.Types.ObjectId,
      ref: "Topic",
    },
    reviews: [reviewSchema],
    rating: { type: Number, default: 0 },
    numberReview: { type: Number, default: 0 },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", course);
