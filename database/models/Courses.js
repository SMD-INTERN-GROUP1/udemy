const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");

const mongooseDelete = require("mongoose-delete");
mongoose.plugin(slug);

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

const question =  new mongoose.Schema({
  question : String,
  result : { type : Number, enum : [1,2,3,4] },
  answer_1 : String,
  answer_2 : String,
  answer_3 : String,
  answer_4 : String,
}, {
  timestamps : true
})


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
    reviews: [reviewSchema],
    rating: { type: Number, default: 0 },
    numberReview: { type: Number, default: 0 },
    questions : [question]
    // kids: [{type:mongoose.Schema.Types.ObjectId}]  
  },
  { timestamps: true }
);


// Add plugin
// mongoose.plugin(slug);
course.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });
module.exports = mongoose.model("Courses", course);


