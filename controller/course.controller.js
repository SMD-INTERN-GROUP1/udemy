const Course = require("../database/models/course");
const categoryService = require("../services/category.services");
const User = require("../database/models/Users");
const { format } = require("timeago.js");
const Users = require("../database/models/Users");

const getDetailCourse = async (req, res, next) => {
  const slug = req.params.slug;
  const categories = await categoryService.getListCategory();
  const course = await Course.findOne({ slug: slug });
  let isLogin = false;
  if (!req.cookies.user) {
    isLogin = true;
    console.log("cookies", req.cookies.user);
  }

  course.reviews.sort(function (a, b) {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  res.render("component/course_detail", {
    course,
    categories,
    isLogin,
    format,
    user: req.cookies.user || null,
  });
};

const renderCoursePage = async (req, res, next) => {
  res.render("template/master", {
    title: "Topic page",
    content: "../course/course_index",
  });
};

// create review
const createReview = async (req, res) => {
  const { comment, rate } = req.body;
  if (!comment || !rate) {
    return res.redirect("back");
  }
  const course = await Course.findById(req.params.id);
  const user = await User.findOne({ username: req.cookies.user.username });

  if (!course) {
    return res.status(400).json({ err: "course is not exist !" });
  }

  const newReview = {
    comment,
    rate,
    name: user.username,
    user: user._id,
    createdAt: Date.now(),
  };

  // course.reviews = [];
  // await course.save();

  course.reviews.push(newReview);

  course.numberReview = course.reviews.length;

  course.rating =
    course.reviews.reduce((total, review) => {
      return total + review.rate;
    }, 0) / course.reviews.length;

  await course.save();

  return res.redirect("back");
};

const deleteReview = async (req, res) => {
  const course = await Course.findById(req.params.idCourse);
  const user = await User.findOne({ username: req.cookies.user.username });

  if (!course) {
    return res.status(400).json({ err: "course is not exist !" });
  }

  // await course.updateOne({
  //   $pull: {
  //     reviews: req.params.id,
  //   },
  // });

  const index = course.reviews.findIndex((review) => {
    return review._id == req.params.id;
  });
  if (index !== -1) {
    if (
      JSON.stringify(user._id) != JSON.stringify(course.reviews[index].user)
    ) {
      return res
        .status(400)
        .json({ err: "You can not delete review of the other people !" });
    }
    course.reviews.splice(index, 1);
  }

  if (course.reviews.length > 0) {
    course.numberReview = course.reviews.length;

    course.rating =
      course.reviews.reduce((total, review) => {
        return total + Number(review.rate);
      }, 0) / course.reviews.length;
  } else {
    course.numberReview = 0;

    course.rating = 0;
  }

  await course.save();
  return res.redirect("back");
};

module.exports = {
  getDetailCourse,
  renderCoursePage,
  createReview,
  deleteReview,
};
