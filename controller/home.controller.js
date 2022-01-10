const categoryService = require("../services/category.services");
const Course = require('../database/models/Courses');

const getHomePage = async (req, res, next) => {
  const categories = await categoryService.getListCategory();
  const courses = await Course.find();
  res.render("index", { title: "Udemy", categories, courses});
};

module.exports = {
  getHomePage
};
