const Course = require("../database/models/course");
const categoryService = require("../services/category.services");

const getDetailCourse = async (req, res, next) => {
  const slug = req.params.slug;
  const categories = await categoryService.getListCategory();
  const course = await Course.findOne({ slug: slug });
  let isLogin = false;
  if (!req.cookies.user) {
    isLogin = true;
    console.log("cookies", req.cookies.user);
  }
  res.render("component/course_detail", {
    course,
    categories,
    isLogin,
  });
};

const renderCoursePage = async (req, res, next) => {
  res.render("template/master", {
    title: "Topic page",
    content: "../course/course_index",
  });
};
module.exports = {
  getDetailCourse,
  renderCoursePage,
};
