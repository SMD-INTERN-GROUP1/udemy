const { format } = require("timeago.js");
const Course = require("../database/models/Courses");
const categoryService = require("../services/category.services");
const UserModal = require("../database/models/Users");
const getDetailCourse = async (req, res, next) => {
  const slug = req.params.slug;
  const categories = await categoryService.getListCategory();
  const course = await Course.findOne({ slug: slug });
  let isLogin = false;
  if (!req.cookies.user) {
    isLogin = true;
    console.log("cookies", req.cookies.user);
  }
  course.reviews &&
    course.reviews.sort(function (a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  res.render("component/course_detail", {
    course,
    categories,
    isLogin,
    format,
    user: (await UserModal.findById(req.cookies.user?._id)) || null,
  });
};

const getSearch = async (req, res, next) => {
  try {
    const categories = await categoryService.getListCategory();
    const courses = await Course.find();
  
    const title = req.query.title;
    const data = courses.filter(function (item) {
      return item.title.toLowerCase().indexOf(title.toLowerCase()) !== -1;
    });

    // req.query.sort["fieldname"] =  asc | desc

    const productnumber = 4;
    const total_pages = Math.ceil(data.length / productnumber);
    const num = Number(req.params.page);
    const pagination = data.slice(
      productnumber * num,
      productnumber * (1 + num)
    );
    let isLogin = false;
    let userSearch;

    if (!req.cookies.user) {
      req.cookies.user = {};

      if (!req.cookies.user.username) isLogin = true;
    } else {
      if (req.cookies.user._id)
        userSearch = await UserModal.findById(req.cookies.user._id);
    }

    const sort = req.query.sort;
    if (sort) {
      const keys = Object.keys(req.query.sort)[0];

      pagination.sort((objecta, objectb) => {
        return sort[keys] === "asc"
          ? objecta.price - objectb.price
          : objectb.price - objecta.price;
      });
    }
    res.render("search", {
      categories,
      pagination,
      title,
      total_pages,
      result: data.length,
      isLogin,
      user: userSearch || { wishList: [] },
    });
  } catch (error) {
    console.log(error.message);
  }
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
  const user = await UserModal.findOne({ username: req.cookies.user.username });

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
  const user = await UserModal.findOne({ username: req.cookies.user.username });

  if (!course) {
    return res.status(400).json({ err: "course is not exist !" });
  }

  // await course.updateOne({
  //   $pull: {
  //     reviews: req.params.id,
  //   },
  // });
  // number, boolean, string
  // object, funtion, array => const a = {a : ""}
  
 // void afunc(* ){ num = 3 } 
 // int a = 4;
 // afunc(a)


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

const wishListFunc = async (req, res) => {
  const categories = await categoryService.getListCategory();
  let isLogin = false;
  if (!req.user.username) {
    isLogin = true;
  }
  const user = await UserModal.findOne({
    username: req.user.username,
  }).populate("wishList");

  const newUser = await UserModal.findOne({
    username: req.user.username,
  });
  return res.render("wish", {
    wishList: user.wishList,
    isLogin,
    user: newUser,
    lengthlist: user.wishList.length,
    categories,
  });
};

module.exports = {
  getDetailCourse,
  renderCoursePage,
  getSearch,
  wishListFunc,
  createReview,
  deleteReview,
};
