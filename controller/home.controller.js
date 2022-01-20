const Course = require("../database/models/Courses");
const Banner = require("../database/models/banners");
const Instructor = require("../database/models/Instrutor");
const User = require("../database/models/Users");
const categoryService = require("../services/category.services");

const getHomePage = async (req, res, next) => {
  try {
    const categories = await categoryService.getListCategory();
    const banners = await Banner.find();
    const courses = await Course.find({ delete: false });
    let isLogin = false;
    if (!req.cookies.user) {
      isLogin = true;
      console.log("cookies", req.cookies.user);
    }

    res.render("index", {
      title: "Udemy",
      isLogin,
      categories,
      banners,
      courses,
    });
  } catch (e) {
    console.log(e);
  }
};

const renderTeachingPage = async (req, res, next) => {
  const categories = await categoryService.getListCategory();
  let isLogin = false;
  if (!req.cookies.user) {
    isLogin = true;
    console.log("cookies", req.cookies.user);
  }

  res.render("component/instructor", {
    title: "Instructor page",
    categories,
    isLogin,
  });
};

const renderTeachingRegister = async (req, res, next) => {
  const categories = await categoryService.getListCategory();

  let isLogin = true;
  let user;
  if (req.cookies.user) {
    isLogin = false;
    console.log("cookies", req.cookies.user);
    user = req.cookies.user;
  }
  res.render("component/teaching_register", {
    title: "Teaching Register",
    isLogin,
    categories,
    user,
  });
};

const teachingRegister = (req, res, next) => {
  let data;
  const id = req.body.user_id;
  const { specialty, description, experience, user_id } = req.body;
  data = { specialty, description, experience, user_id };
  Promise.all([
    Instructor.create(data),
    User.updateOne(
      { isTeacher: false, _id: id },
      { $set: { isTeacher: true } }
    ),
  ]).then(() => {
    res.redirect("/instructor");
  });
};

module.exports = {
  getHomePage,
  renderTeachingPage,
  renderTeachingRegister,
  teachingRegister,
};
