const Course = require("../database/models/Courses");
const Banner = require("../database/models/banners");
const categoryService = require("../services/category.services");

const getHomePage = async (req, res, next) => {
  try {
    const categories = await categoryService.getListCategory();
    const banners = await Banner.find();
    const courses = await Course.find();
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

  let isLogin = false;
  let user;
  let userId;
  if (!req.cookies.user) {
    isLogin = true;
    console.log("cookies", req.cookies.user);
    user = req.cookies.user.username;
    userId = req.cookies.user._id;
  }
  res.render("component/teaching_register", {
    title: "Teaching Register",
    isLogin,
    categories,
    user,
    userId,
  });
};

module.exports = {
  getHomePage,
  renderTeachingPage,
  renderTeachingRegister,
};
